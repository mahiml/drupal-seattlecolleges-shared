{HEADER}
<div class="region region-main grid-12">
	<table class="maintable">
		<tr>
			<td>
				<table width="100%" border="0" cellspacing="0" cellpadding="0" class="calborder">
					<tr>
						<td>
							<table width="100%" border="0" cellspacing="0" cellpadding="0">
								<tr valign="top">
									<td class="title"><h1>Subscribable Formats</h1><span class="V9G">Staying informed is even easier! Get event information delivered directly to you by subscribing to the calendars in which you are interested.</span></td>
									<td valign="top" align="right" width="120" class="navback">	
										<div style="padding-top: 3px;">
										<table width="120" border="0" cellpadding="0" cellspacing="0">
											<tr valign="top">
												<td><a class="psf" href="../day.php?cal={CAL}&amp;getdate={GETDATE}"><img src="../templates/{TEMPLATE}/images/day_on.gif" alt="{L_DAY}" title="{L_DAY}" border="0" /></a></td>
												<td><a class="psf" href="../week.php?cal={CAL}&amp;getdate={GETDATE}"><img src="../templates/{TEMPLATE}/images/week_on.gif" alt="{L_WEEK}" title="{L_WEEK}" border="0" /></a></td>
												<td><a class="psf" href="../month.php?cal={CAL}&amp;getdate={GETDATE}"><img src="../templates/{TEMPLATE}/images/month_on.gif" alt="{L_MONTH}" title="{L_MONTH}" border="0" /></a></td>
												<td><a class="psf" href="../year.php?cal={CAL}&amp;getdate={GETDATE}"><img src="../templates/{TEMPLATE}/images/year_on.gif" alt="{L_YEAR}" title="{L_YEAR}" border="0" /></a></td>
											</tr>
										</table>
										</div>
									</td>
								</tr>  			
							</table>
						</td>
					</tr>
				</table>
			</td>
		</tr>
	</table>
	
	<div class="ical-list grid-6 alpha">
		<h2>iCalendar</h2>
		<p>If you'd like to have events appear in your favorite calendar application (Outlook, Sunbird, iCal, etc.) use these links to subscribe.</p>
<!-- ICAL_LIST -->
	</div>
	
	<div class="rss-list grid-6 omega">
		<h2>RSS</h2>
		<p>If you'd like to receive event info in your feed reader, use these links to subscribe.</p>
		{RSS_LIST}
	</div>
</div>
{FOOTER}