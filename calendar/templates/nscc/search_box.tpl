<form action="search.php" method="get">
	<input type="hidden" name="cpath" value="{CPATH}"/>
	<input type="hidden" name="cal" value="{CAL}"/>
	<input type="hidden" name="getdate" value="{GETDATE}"/>
	<label for="search-terms">{L_SEARCH}:</label>
	<input type="text" id="search-terms" class="query-field" name="query" value=""/>
	<input type="image" class="search-button" src="templates/{TEMPLATE}/images/search.gif" name="submit" value="Search"/>
</form>
