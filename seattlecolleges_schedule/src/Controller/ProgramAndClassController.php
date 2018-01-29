<?php
/**
 * Created by PhpStorm.
 * User: mahim
 * Date: 1/19/18
 * Time: 2:41 PM
 */

namespace Drupal\seattlecolleges_schedule\Controller;

use Drupal\Core\Config\ConfigFactory;
use Drupal\Core\Controller\ControllerBase;
use Drupal\Core\Render\RendererInterface;
use Symfony\Component\DependencyInjection\ContainerInterface;
use Symfony\Component\HttpFoundation\RequestStack;
use \Drupal\Core\Cache\CacheBackendInterface;

class ProgramAndClassController extends ControllerBase
{

    const CURRENT_QUARTER = 'current';
    const PREVIOUS_QUARTER = 'previous';
    const NEXT_QUARTER = 'next';

    const scc_catalog_wsdl = 'http://seattlecolleges.edu/webservices/SCCcatalog.asmx?WSDL';
    /**
     * RequestStack object for getting requests.
     *
     * @var \Symfony\Component\HttpFoundation\RequestStack and config
     */
    protected $requestStack;
    protected $this_config;
    protected $get_quarters_API_url;
    protected $campus_code;
    protected $soap_client_options;
    protected $current_quarter;
    protected $previous_quarter;
    protected $next_quarter;
    protected $all_quarters;
    protected $quarters_data;
    protected $all_programs;
    protected $renderer;


    /**
     * ProgramAndClassController constructor.
     * @param \Symfony\Component\HttpFoundation\RequestStack $requestStack
     *   The request object.
     */
    public function __construct(RequestStack $requestStack, ConfigFactory $configFactory, RendererInterface $renderer_service )
    {
        $this->requestStack = $requestStack;
        $this->renderer = $renderer_service;
        $this->this_config = $configFactory->getEditable('seattlecolleges_schedule_configuration.settings');
        $this->get_quarters_API_url = $this->this_config->get('getQuartersAPIEndpoint');
        $this->campus_code = $this->this_config->get('campusCode');
        $this->soap_client_options = array("trace" => false, "exceptions" => true, 'features' => SOAP_SINGLE_ELEMENT_ARRAYS + SOAP_USE_XSI_ARRAY_TYPE);
        $this->all_quarters = $this->getQuartersData();
    }

    /**
     * {@inheritdoc}
     */
    public static function create(ContainerInterface $container)
    {
        return new static(
            $container->get('request_stack'),
            $container->get('config.factory'),
            $container->get('renderer')
        );
    }

    public function getScheduleElement()
    {
        $build = [
            'seattlecolleges_composite_schedule' => [
                '#type' => 'schedule_element',
                '#label' => $this->t('This is the main schedule element containing nav tabs and a drop down in each to show '),
                '#description' => $this->t('Quarter Data has been saved')
            ],
            'class_list' => [
                '#theme' => 'class_list',
                '#all_classes' => $this->getClassesForCollegeAndQuarter('062', $this->current_quarter),
                '#cache' => ['keys' => ['seattlecolleges_scheduler']
                ]
            ]
        ];
        $this->renderer->addCacheableDependency($build, $this->this_config);
        return $build;
    }

    public function getClassesForCollegeAndQuarter($campusCode, $quarter)
    {
        $response = null;
        try {
            $soap_client = new \SoapClient(ProgramAndClassController::scc_catalog_wsdl, $this->soap_client_options);
            $requestParams = array('colcode' => $campusCode, 'searchBy' => '', 'searchText' => '');
            $response = $soap_client->getXMLProgramList($requestParams);
            $data = simplexml_load_string($response->getXMLProgramListResult->any);
            foreach ($data as $program_details) {
                $this->all_programs[(string)$program_details->ProgramID] = [];
                foreach ((array)$program_details as $key => $value) {
                    $this->all_programs[(string)$program_details->ProgramID][$key] = $value;
                }
            }
            return $this->all_programs;
        } catch (\SoapFault $fault) {
            trigger_error("SOAP Fault: (faultcode: { $response->faultcode }, faultstring: { $response->faultstring })", E_USER_ERROR);
        }
    }

    public function getCurrentQuarterData()
    {
        return $this->current_quarter;
    }

    public function getPreviousQuarterData()
    {
        return $this->previous_quarter;
    }

    public function getNextQuarterData()
    {
        return $this->next_quarter;
    }

    public function getAllQuarters()
    {
        return $this->all_quarters;
    }


    protected function getModuleName()
    {
        return "seattlecolleges_schedule";
    }

    /**
     * First character indicates DECADE
     * ( 9 = 199x )
     * A = 200x
     * B =  201x
     * C  = 202x
     * D  = 203x
     *
     *
     * Second and third characters are the last digits of the years in the academic year/period
     * Academic year is 17-18
     * Second character =  7   [ 2017-18 ]
     * Third character =     8   2017-18 ]
     *
     * Fourth character is the quarter code
     * 1 = Summer
     * 2 = Fall
     * 3 = Winter
     * 4 = Spring
     *
     *
     * So for the upcoming 2018-19 academic year, the codes are:
     * B891
     * B892
     * B893
     * B894
     */
    public function getQuartersData()
    {
        $response = null;
        try {
            $soap_client = new \SoapClient(ProgramAndClassController::scc_catalog_wsdl, $this->soap_client_options);
            $response = $soap_client->getXMLCurrentQuarter();
            $this->xml2array(simplexml_load_string($response->getXMLCurrentQuarterResult->any)->quarter, $this->current_quarter);

            $response = $soap_client->getXMLPreviousQuarter();
            $this->xml2array(simplexml_load_string($response->getXMLPreviousQuarterResult->any)->quarter, $this->previous_quarter);;

            $response = $soap_client->getXMLNextQuarter();
            $this->xml2array(simplexml_load_string($response->getXMLNextQuarterResult->any)->quarter, $this->next_quarter);;

            $this->all_quarters = array(ProgramAndClassController::CURRENT_QUARTER => $this->current_quarter, ProgramAndClassController::PREVIOUS_QUARTER => $this->previous_quarter, ProgramAndClassController::NEXT_QUARTER => $this->next_quarter);
            return $this->all_quarters;
        } catch
        (\SoapFault $fault) {
            trigger_error("SOAP Fault: (faultcode: {$response->faultcode}, faultstring: {$response->faultstring})", E_USER_ERROR);
        };
    }

    function xml2array($xmlObject, &$out = array())
    {
        foreach ((array)$xmlObject as $index => $node) {
            $out[$index] = (is_object($node)) ? xml2array($node) : $node;
        }
        return $out;
    }

}
