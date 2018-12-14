<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:svg="http://www.w3.org/2000/svg" version="2.0">
	<xsl:output method="text"/>
	
	<xsl:template match="/">{
	"id": "south-winchester",
	"holes": [<xsl:apply-templates select="//svg:path"><xsl:sort select="substring-after(@id, 'hole')" data-type="number"/></xsl:apply-templates>
	]
}</xsl:template>
	
	<xsl:template match="svg:path[starts-with(@id, 'hole')]">
		"<xsl:value-of select="@d"/>"<xsl:if test="position() != last()">,</xsl:if></xsl:template>
</xsl:stylesheet>