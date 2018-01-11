{HEADER}
<div class="region region-main grid-12">
	<table class="maintable">
		<tr>
			<td>
				<table width="100%" border="0" cellspacing="0" cellpadding="0">
					<tr valign="top">
						<td align="left" width="400" class="title"><h1>{L_RESULTS}</h1><span class="V9G">{CALENDAR_NAME} {L_CALENDAR}</span></td>
						<td valign="top" align="right" width="120" class="navback">
							<div style="padding-top: 3px;">
							<table width="120" border="0" cellpadding="0" cellspacing="0">
								<tr valign="top">
									<td><a class="psf" href="day.php?cal={CAL}&amp;getdate={GETDATE}"><img src="templates/{TEMPLATE}/images/day_on.gif" alt="{L_DAY}" title="{L_DAY}" border="0" /></a></td>
									<td><a class="psf" href="week.php?cal={CAL}&amp;getdate={GETDATE}"><img src="templates/{TEMPLATE}/images/week_on.gif" alt="{L_WEEK}" title="{L_WEEK}" border="0" /></a></td>
									<td><a class="psf" href="month.php?cal={CAL}&amp;getdate={GETDATE}"><img src="templates/{TEMPLATE}/images/month_on.gif" alt="{L_MONTH}" title="{L_MONTH}" border="0" /></a></td>
									<td><a class="psf" href="year.php?cal={CAL}&amp;getdate={GETDATE}"><img src="templates/{TEMPLATE}/images/year_on.gif" alt="{L_YEAR}" title="{L_YEAR}" border="0" /></a></td>
								</tr>
							</table>
							</div>
						</td>
					</tr>
				</table>
			</td>
		</tr>
		<tr>
			<td align="left">
					<div class="search-box">
						{SEARCH_BOX}
					</div>
				<div class="search-results">
					<div class="query">
						<p><label>{L_QUERY}:</label> {FORMATTED_SEARCH}</p>
					</div>
					<!-- switch results on -->
					<div class="result-group">
						<h3><a class="ps3" href="day.php?cal={CAL}&amp;getdate={KEY}">{L_STARTING_ON} {DAYOFMONTH}</a></h3>
						<table width="100%" border="0" cellspacing="1" cellpadding="1">
							<tr>
								<td width="120" class="G10BOLD">{L_TIME}:</td>
								<td align="left" class="G10B">{EVENT_START}</td>
							</tr><tr>
								<td width="120" class="G10BOLD">{L_LOCATION}:</td>
								<td align="left" class="G10B">{LOCATION}</td>
							</tr>
							<tr>
								<td valign="top" width="100" class="G10BOLD">{L_SUMMARY}:</td>
								<td valign="top" align="left" class="G10B">{EVENT_TEXT}</td>
							</tr>
							<!-- switch recur on -->
							<tr>
								<td valign="top" width="100" class="G10BOLD">{L_RECURRING_EVENT}:</td>
								<td valign="top" align="left" class="G10B">{RECUR}</td>
							</tr>
							<!-- switch recur off -->
							<!-- switch description on -->
							<tr>
								<td valign="top" width="100" class="G10BOLD">{L_DESCRIPTION}:</td>
								<td valign="top" align="left" class="G10B">{DESCRIPTION}</td>
							</tr>
							<!-- switch description off -->
						</table>
					</div>
					<!-- switch exceptions on -->
					<div class="result-group exceptions">
						<h3>{L_EXCEPTION}</h3>: <a class="ps3" href="day.php?cal={CAL}&amp;getdate={KEY}">{DAYOFMONTH}</a></font><br />
						<table width="100%" border="0" cellspacing="1" cellpadding="1">
							<tr>
								<td width="100" class="V10">{L_TIME}:</td>
								<td align="left" class="V10">{EVENT_START}</td>
							</tr>
							<tr>
								<td valign="top" width="100" class="V10">{L_SUMMARY}:</td>
								<td valign="top" align="left" class="V10">{EVENT_TEXT}</td>
							</tr>
							<!-- switch except_recur on -->
							<tr>
								<td valign="top" width="100" class="V10">{L_RECURRING_EVENT}:</td>
								<td valign="top" align="left" class="V10">{EXCEPT_RECUR}</td>
							</tr>
							<!-- switch except_recur off -->
							<!-- switch except_description on -->
							<tr>
								<td valign="top" width="100" class="V10">{L_DESCRIPTION}:</td>
								<td valign="top" align="left" class="V10">{EXCEPT_DESCRIPTION}</td>
							</tr>
							<!-- switch except_description off -->
						</table>
					</div>
					<!-- switch exceptions off -->
					<!-- switch results off -->
	
					<!-- switch no_results on -->
					<div class="result-group no-results">
						<p>{L_NO_RESULTS}</p>
					</div>
					<!-- switch no_results off -->
				</div>
				<div class="search-box">
					{SEARCH_BOX}
				</div>
			</td>
		</tr>
	</table>
</div>

{FOOTER}

