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
use Symfony\Component\DependencyInjection\ContainerInterface;
use Symfony\Component\HttpFoundation\RequestStack;

class ProgramAndClassController extends ControllerBase
{
    /**
     * RequestStack object for getting requests.
     *
     * @var \Symfony\Component\HttpFoundation\RequestStack and config
     */
    protected $requestStack;
    protected $this_config;
    protected $http_client;
    protected $get_quarters_API_url;
    protected $campus_code;


    /**
     * ProgramAndClassController constructor.
     * @param \Symfony\Component\HttpFoundation\RequestStack $requestStack
     *   The request object.
     */
    public function __construct(RequestStack $requestStack, ConfigFactory $configFactory)
    {
        $this->requestStack = $requestStack;
        $this->this_config = $configFactory->getEditable('seattlecolleges_schedule_configuration.settings');
        $this->get_quarters_API_url = $this->this_config->get('getQuartersAPIEndpoint');
        $this->campus_code = $this->this_config->get('campusCode');
        $this->http_client = \Drupal::httpClient();
    }

    /**
     * {@inheritdoc}
     */
    public static function create(ContainerInterface $container)
    {
        return new static(
            $container->get('request_stack'),
            $container->get('config.factory')
        );
    }

    public function simple()
    {
        return [
            'example one' => [
                '#markup' => '<div>Markup Example</div>',
            ],
            'example two' => [
                '#type' => 'schedule_element',
                '#label' => $this->t('This is the quarters data called before prerender is called'),
                '#description' => $this->getQuartersData()
            ],
        ];
    }

    public function getYRQ(){

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
        $body = json_encode(array('campusCode'=> $this->campus_code, 'today'=>""));
        $options['headers'] =  ['Content-Type' => 'application/json', 'Accept' => 'application/json'];
        $options['body'] = $body;
        $response = $this->http_client->request('POST', $this->get_quarters_API_url, $options);
        return $response->getBody();
    }
}
