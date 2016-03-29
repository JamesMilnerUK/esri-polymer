// COPYRIGHT © 2016 Esri
//
// All rights reserved under the copyright laws of the United States
// and applicable international laws, treaties, and conventions.
//
// This material is licensed for use under the Esri Master License
// Agreement (MLA), and is bound by the terms of that agreement.
// You may redistribute and use this code without modification,
// provided you adhere to the terms of the MLA and include this
// copyright notice.
//
// See use restrictions at http://www.esri.com/legal/pdfs/mla_e204_e300/english
//
// For additional information, contact:
// Environmental Systems Research Institute, Inc.
// Attn: Contracts and Legal Services Department
// 380 New York Street
// Redlands, California, USA 92373
// USA
//
// email: contracts@esri.com
//
// See http://js.arcgis.com/3.16/esri/copyright.txt for details.

define({documentTypes:{data:{caption:"INSPIRE (duomenys)",description:""},service:{caption:"INSPIRE (paslauga)",description:""}},dataThemeKeywords:{caption:"Inspire duomenų tema"},inspireServiceType:{discovery:"Paieškos paslauga",view:"Peržiūros paslauga",download:"Atsisiuntimo paslauga",transformation:"Transformavimo paslauga",invoke:"Iškvietimo paslauga",other:"Kitos paslaugos"},keywordSections:{dataTheme:"Inspire duomenų tema",serviceCategory:"ISO 19119 paslaugos kategorija",gemetConcept:"GEMET sąvoka",otherKeywords:"Kiti raktažodžiai"},LanguageCode:{bul:"Bulgarų",cze:"Čekų",dan:"Danų",dut:"Olandų",eng:"Anglų",est:"Estų",fin:"Suomių",fre:"Prancūzų",ger:"Vokiečių",gre:"Graikų",hun:"Vengrų",gle:"Gėlų (airių)",ita:"Italų",lav:"Latvių",lit:"Lietuvių",mlt:"Maltiečių",pol:"Lenkų",por:"Portugalų",rum:"Rumunų",slo:"Slovakų",slv:"Slovėnų",spa:"Ispanų",swe:"Švedų",chi:"Kinų",kor:"Korėjiečių",nor:"Norvegų",rus:"Rusų",tur:"Turkų k."},otherConstraints:{noLimitations:"Be apribojimų",confidentialityOfProceedings:"Valdžios institucijų procesinių veiksmų konfidencialumas...",internationalRelations:"Tarptautiniai santykiai, visuomenės saugumas arba krašto apsauga",courseOfJustice:"Teisingumas, bet kurio asmens galimybė pasinaudoti nešališku teismu...",confidentialityOfCommercial:"Komercinės arba pramoninės informacijos konfidencialumas...",intellectualProperty:"Intelektinės nuosavybės teisės",confidentialityOfPersonalData:"Asmens duomenų ir (arba) failų konfidencialumas...",interestsOrProtection:"Asmens, pateikusio informaciją, interesai arba apsauga...",protectionOfEnvironment:"Aplinkos, su kuria tokia informacija susijusi, apsauga...",freeText:"Laisvos formos tekstas"},serviceType:{humanInteractionService:"100 Geografinės žmonių bendravimo paslaugos",humanCatalogueViewer:"101 Katalogo žiūryklė",humanGeographicViewer:"102 Geografinė žiūryklė",humanGeographicSpreadsheetViewer:"103 Geografinės skaičiuoklės žiūryklė",humanServiceEditor:"104 Paslaugos rengyklė",humanChainDefinitionEditor:"105 Sekos apibrėžties rengyklė",humanWorkflowEnactmentManager:"106 Procedūros aktyvinimo tvarkytuvė",humanGeographicFeatureEditor:"107 Geografinių savybių rengyklė",humanGeographicSymbolEditor:"108 Geografinių ženklų rengyklė ",humanFeatureGeneralizationEditor:"109 Savybių apibendrinimo rengyklė",humanGeographicDataStructureViewer:"110 Geografinių duomenų struktūros žiūryklė",infoManagementService:"200 Geografinio modelio ir (arba) geografinės informacijos valdymo paslauga",infoFeatureAccessService:"201 Savybės prieigos paslauga",infoMapAccessService:"202 Žemėlapio prieigos paslauga",infoCoverageAccessService:"203 Aprėpties zonos prieigos paslauga",infoSensorDescriptionService:"204 Jutiklio aprašo paslauga",infoProductAccessService:"205 Produkto prieigos paslauga",infoFeatureTypeService:"206 Savybės tipo paslauga",infoCatalogueService:"207 Katalogo paslauga",infoRegistryService:"208 Registro paslauga",infoGazetteerService:"209 Vietovardžių sąrašo vadovo paslauga",infoOrderHandlingService:"210 Užsakymų tvarkymo paslauga",infoStandingOrderService:"211 Nuolatinio užsakymo paslauga",taskManagementService:"300 Geografinių procedūrų ir (arba) užduočių valdymo paslaugos",chainDefinitionService:"301 Sekos apibrėžties paslauga",workflowEnactmentService:"302 Procedūros aktyvinimo paslauga",subscriptionService:"303 Prenumeratos paslauga",spatialProcessingService:"400 Geografinių duomenų apdorojimo paslaugos – erdvinės",spatialCoordinateConversionService:"401 Koordinačių konvertavimo paslauga",spatialCoordinateTransformationService:"402 Koordinačių transformavimo paslauga",spatialCoverageVectorConversionService:"403 Aprėpties–krypties konvertavimo paslauga",spatialImageCoordinateConversionService:"404 Atvaizdo koordinačių konvertavimo paslauga",spatialRectificationService:"405 Pataisų sistema",spatialOrthorectificationService:"406 Ortografinių pataisų paslauga",spatialSensorGeometryModelAdjustmentService:"407 Jutiklio geometrinio modelio koregavimo paslauga",spatialImageGeometryModelConversionService:"408 Atvaizdo geometrinio modelio konvertavimo paslauga",spatialSubsettingService:"409 Skaidymo paslauga",spatialSamplingService:"410 Atrankos paslauga",spatialTilingChangeService:"411 Išdėstymo keitimo paslauga",spatialDimensionMeasurementService:"412 Dydžio matavimo paslauga",spatialFeatureManipulationService:"413 Savybių apdorojimo paslaugos",spatialFeatureMatchingService:"414 Savybės suderinimo paslauga",spatialFeatureGeneralizationService:"415 Savybių apibendrinimo paslauga",spatialRouteDeterminationService:"416 Maršruto nustatymo paslauga",spatialPositioningService:"417 Padėties nustatymo paslauga",spatialProximityAnalysisService:"418 Artumo analizės paslauga",thematicProcessingService:"500 Geografinių duomenų apdorojimo paslaugos – teminės",thematicGoparameterCalculationService:"501 Geografinių dydžių apskaičiavimo paslauga",thematicClassificationService:"502 Teminio klasifikavimo paslauga",thematicFeatureGeneralizationService:"503 Savybių apibendrinimo paslauga",thematicSubsettingService:"504 Skaidymo paslauga",thematicSpatialCountingService:"505 Erdvinių duomenų apskaičiavimo paslauga",thematicChangeDetectionService:"506 Pokyčių nustatymo paslauga",thematicGeographicInformationExtractionService:"507 Geografinės informacijos išrinkimo paslaugos",thematicImageProcessingService:"508 Atvaizdų apdorojimo paslauga",thematicReducedResolutionGenerationService:"509 Mažesnės skiriamosios gebos generavimo paslauga",thematicImageManipulationService:"510 Atvaizdų manipuliavimo paslaugos",thematicImageUnderstandingService:"511 Atvaizdų aiškinimo paslaugos",thematicImageSynthesisService:"512 Atvaizdų sintezės paslaugos",thematicMultibandImageManipulationService:"513 Daugiajuosčių atvaizdų apdorojimas",thematicObjectDetectionService:"514 Objektų suradimo paslauga",thematicGeoparsingService:"515 Geografinių duomenų analizės paslauga",thematicGeocodingService:"516 Geografinių duomenų kodavimo paslauga",temporalProcessingService:"600 Geografinių duomenų apdorojimo paslaugos – susijusios su laiku",temporalReferenceSystemTransformationService:"601 Laiko skaičiavimo sistemos transformavimo paslauga",temporalSubsettingService:"602 Skaidymo paslauga",temporalSamplingService:"603 Atrankos paslauga",temporalProximityAnalysisService:"604 Artumo laiko atžvilgiu analizės paslauga",metadataProcessingService:"700 Geografinių duomenų apdorojimo paslaugos – metaduomenys",metadataStatisticalCalculationService:"701 Statistinių apskaičiavimų paslauga",metadataGeographicAnnotationService:"702 Pastabų dėl geografinių duomenų teikimo paslauga",comService:"800 Geografinių duomenų perdavimo paslaugos",comEncodingService:"801 Kodavimo paslauga",comTransferService:"802 Perdavimo paslauga",comGeographicCompressionService:"803 Geografinių duomenų glaudinimo paslauga",comGeographicFormatConversionService:"804 Geografinių duomenų formato konvertavimo paslauga",comMessagingService:"805 Pranešimų paslauga",comRemoteFileAndExecutableManagement:"806 Nuotolinis rinkmenų ir vykdomųjų programų valdymas"},useLimitation:{noCondition:"Sąlygos netaikomos",unknownCondition:"Sąlygos nežinomos",freeText:"Laisvos formos tekstas"}});