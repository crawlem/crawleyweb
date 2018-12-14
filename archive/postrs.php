<?php
header('Content-type: text/xml');
?><soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:soapenc="http://schemas.xmlsoap.org/soap/encoding/" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"><soapenv:Body><ac:PostRs xsi:schemaLocation="http://www.ACORD.org/Standards/AcordMsgSvc/1.4.0 AcordMsgSvc_v-1-4-0.xsd" xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:soapenc="http://schemas.xmlsoap.org/soap/encoding/" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:wsu="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-utility-1.0.xsd" xmlns="http://www.ACORD.org/Standards/AcordMsgSvc/Inbox" xmlns:ac="http://www.ACORD.org/Standards/AcordMsgSvc/1.4.0" xmlns:wsa="http://www.w3.org/2005/08/addressing">
<ac:Sender>
	<ac:PartyId>urn:duns:666555444</ac:PartyId>
	<ac:PartyRoleCd>Insurer</ac:PartyRoleCd>
	<ac:PartyName>IBM Test Insurer 2</ac:PartyName>
</ac:Sender>
<ac:Receiver>
	<ac:PartyId>urn:duns:999999999</ac:PartyId>
	<ac:PartyRoleCd>ServiceProvider</ac:PartyRoleCd>
	<ac:PartyName>IMN</ac:PartyName>
</ac:Receiver>
<ac:Application xmlns:ac="http://www.ACORD.org/Standards/AcordMsgSvc/1.4.0"><ac:ApplicationCd>Jv-Ins-Reinsurance</ac:ApplicationCd><ac:SchemaVersion>http://www.ACORD.org/standards/Jv-Ins-Reinsurance/2009-1</ac:SchemaVersion></ac:Application><ac:TimeStamp xmlns:ac="http://www.ACORD.org/Standards/AcordMsgSvc/1.4.0">2011-07-18T11:41:04Z</ac:TimeStamp><ac:MsgItems><ac:MsgItem><ac:MsgId>8eb6bf80-ce84-1004-8480-c02a4b609f6f</ac:MsgId><ac:MsgTypeCd>Placing</ac:MsgTypeCd><ac:MsgStatusCd>received</ac:MsgStatusCd></ac:MsgItem></ac:MsgItems></ac:PostRs></soapenv:Body></soapenv:Envelope>