/**
 * Created by jamesbray on 8/20/16.
 */
console.debug("Entering satterfield international application...");

var app = angular.module('satterfieldinternational', ["ngRoute"]);

//var urlPrefix = "/SatterfieldInternationalPatientDashboard";
var urlPrefix = "";  //set for localhost

var rootUrl = "http://satterfieldsurveyinternational.org";
//var rootUrl = "http://strawberry23.net";

var commonExportUrl = rootUrl + "/satterfieldmedical/export";

var baseUrl = 'http://satterfieldsurveyinternational.org:8080/satterfieldmedical';
//var baseUrl = 'http://www.strawberry23.net:8080/satterfieldmedical';
//var baseUrl = 'http://www.docsatisfaction.com:8080/satterfieldmedical';
//var baseUrl = 'http://localhost:8080/';

var localkey = '';

app
    .config(function($routeProvider){
        console.debug("config");
        $routeProvider.when('/dashboard', {templateUrl: "/view/dashboard.html"})
            .when("/logout", {templateUrl: urlPrefix + "/index.html"})
            .when("/patient-dashboard", {templateUrl: urlPrefix + "/view/patient-dash.html"})
            .when("/physician-dashboard", {templateUrl: urlPrefix + "/view/physician-dash.html"})
            .when("/home", {templateUrl: urlPrefix + "/view/welcome.html"})
            .when("/institutions", {templateUrl: urlPrefix + "/view/institution.html"})
            .otherwise({templateUrl: urlPrefix + "/view/welcome.html"});
    })
    .factory('PatientSurvey', function($q, $http) {
        console.info("Entering factory...");
        var PatientSurvey = new Object();

        PatientSurvey.getAllPatientSurveys = function() {
            console.debug("Entering surveyService.getAllPatientSurveys...");
            var deferred = $q.defer();
            var serviceUrl = baseUrl + '/getallpatientsurveys';
            console.debug('The URL is ' + serviceUrl);
            $http({
                method: 'GET',
                url: serviceUrl,
                headers: {'Content-Type': 'application/json'}
            }).
            success(function(response) {
                console.debug(serviceUrl);
                deferred.resolve({data: response.data});
                data = response.data;
                console.debug(data);  //FOR DEBUG PURPOSES ONLY
            }).
            error(function(){
                console.error("Service call failure...");
                $log.error('Service call failed while performing getAllPatientSurveys function...');
                data = "{'message' : 'error'}";
                deferred.reject(data);
            });
            console.debug("Exiting surveyService.getAllPatientSurveys...");
            return deferred.promise;
        };

        return PatientSurvey;
    })
    .factory('PhysicianSurvey', function($q, $http) {
        console.info("Entering PhysicianSurvey factory...");
        var PhysicianSurvey = new Object();

        PhysicianSurvey.getAllSurveys = function() {
            console.debug("Entering PhysicianSurvey.getAllSurveys...");
            var deferred = $q.defer();
            var serviceUrl = baseUrl + '/getallsurveys';
            console.debug('The URL is ' + serviceUrl);
            $http({
                method: 'GET',
                url: serviceUrl,
                headers: {'Content-Type': 'application/json'}
            }).
            success(function(response) {
                console.debug(serviceUrl);
                deferred.resolve({data: response.data});
                data = response.data;
                console.debug(data);  //FOR DEBUG PURPOSES ONLY
            }).
            error(function(){
                console.error("Service call failure...");
                $log.error('Service call failed while performing getAllSurveys function...');
                data = "{'message' : 'error'}";
                deferred.reject(data);
            });
            console.debug("Exiting PhysicianSurvey.getAllSurveys...");
            return deferred.promise;
        };

        return PhysicianSurvey;
    })
    .factory('Institutions', function($q, $http) {
        console.debug("Entering institutions factory...");
        var Institutions = new Object();

        Institutions.getAllInstitutions = function() {
            console.debug("Entering Institutions.getAllInstitutions()...");
            var deferred = $q.defer();
            var serviceUrl = baseUrl + '/sites';
            console.debug('The URL is ' + serviceUrl);
            $http({
                method: 'GET',
                url: serviceUrl,
                headers: {'Content-Type': 'application/json'}
            }).
            success(function(response) {
                console.debug(serviceUrl);
                deferred.resolve({data: response.data});
                data = response.data;
                console.debug(data);  //FOR DEBUG PURPOSES ONLY
            }).
            error(function(){
                console.error("Service call failure...");
                $log.error('Service call failed while performing getAllInstitutions() function...');
                data = "{'message' : 'error'}";
                deferred.reject(data);
            });
            console.debug("Exiting Institutions.getAllInstitutions()...");
            return deferred.promise;
        },
        /**
         * <p>
         *     API: <code>http://localhost:8080/satterfieldmedical/sites/locale/patient/zn-cn</code>
         * </p>
         */
            Institutions.getPatientInstitutionsByLocale = function(locale) {
                console.debug("Entering Institutions.getPatientInstitutionsByLocale(locale)...");
                var deferred = $q.defer();
                var serviceUrl = baseUrl + '/sites/locale/patient/' + locale;
                console.debug('The URL is ' + serviceUrl);
                $http({
                    method: 'GET',
                    url: serviceUrl,
                    headers: {'Content-Type': 'application/json'}
                }).
                success(function(response) {
                    console.debug(serviceUrl);
                    deferred.resolve({data: response.data});
                    data = response.data;
                    console.debug(data);  //FOR DEBUG PURPOSES ONLY
                }).
                error(function(){
                    console.error("Service call failure...");
                    $log.error('Service call failed while performing getPatientInstitutionsByLocale(locale) function...');
                    data = "{'message' : 'error'}";
                    deferred.reject(data);
                });
                console.debug("Exiting Institutions.getPatientInstitutionsByLocale(locale)...");
                return deferred.promise;
            };

        return Institutions;
    })
    .service('patientSurveyService', function($http, $q, $log) {
        console.debug("Entering patientSurveyService...");

        var data = new Array();

        this.initializeSurvey = function() {
            return {
                site_code: "",
                encounter_code: "",
                ervrating: "",
                ervwhyfeeling: "",
                ervcomment: "",
                hfrating: "",
                hfwhyfeeling: "",
                hfcomment: "",
                preoprating: "",
                preopwhyfeeling: "",
                preopcomment: "",
                postoprating: "",
                postopwhyfeeling: "",
                postopcomment: "",
                dischargewhyfeelin: "",
                dischargecomment: "",
                cvrating: "",
                cvwhyfeeling: "",
                cvcomment: "",
                createdate: ""
            };
        };

        this.initializeSurveys = function() {
            return [{
                site_code: "",
                encounter_code: "",
                ervrating: "",
                ervwhyfeeling: "",
                ervcomment: "",
                hfrating: "",
                hfwhyfeeling: "",
                hfcomment: "",
                preoprating: "",
                preopwhyfeeling: "",
                preopcomment: "",
                postoprating: "",
                postopwhyfeeling: "",
                postopcomment: "",
                dischargerating: "",
                dischargewhyfeeling: "",
                dischargecomment: "",
                cvrating: "",
                cvwhyfeeling: "",
                cvcomment: "",
                createdate: ""
            }];
        };

        this.survey = this.initializeSurvey();

        /**
         *
         * @returns {promise.promise|jQuery.promise|d.promise|promise|jQuery.ready.promise|qFactory.Deferred.promise|*}
         */
        this.getAllPatientSurveys = function() {
            console.debug("Entering surveyService.getAllPatientSurveys...");
            var deferred = $q.defer();
            var serviceUrl = baseUrl + '/getallpatientsurveys';
            console.debug('The URL is ' + serviceUrl);
            $http({
                method: 'GET',
                url: serviceUrl,
                headers: {'Content-Type': 'application/json'}
            }).
            success(function(response) {
                console.debug(serviceUrl);
                deferred.resolve({data: response.data});
                data = response.data;
                console.debug(data);  //FOR DEBUG PURPOSES ONLY
            }).
            error(function(){
                console.error("Service call failure...");
                $log.error('Service call failed while performing getAllPatientSurveys function...');
                data = "{'message' : 'error'}";
                deferred.reject(data);
            });
            console.debug("Exiting patientSurveyService.getAllPatientSurveys...");
            return deferred.promise;
        };


        this.getFilteredPatientSurveysBySite = function(code) {
            console.debug("patientSurveyService.getFilteredPatientSurveysBySite(code)...");
            var deferred = $q.defer();
            var serviceUrl = baseUrl + '/getpatientsurveybysite/' + code;
            console.debug('The URL is ' + serviceUrl);
            $http({
                method: 'GET',
                url: serviceUrl,
                headers: {'Content-Type': 'application/json'}
            }).
            success(function(response) {
                console.debug(serviceUrl);
                deferred.resolve({data: response.data});
                data = response.data;
                console.debug(data);  //FOR DEBUG PURPOSES ONLY
            }).
            error(function(){
                console.error("Service call failure...");
                $log.error('Service call failed while performing getFilteredPatientSurveysBySite(code) function...');
                data = "{'message' : 'error'}";
                deferred.reject(data);
            });
            console.debug("Exiting patientSurveyService.getFilteredPatientSurveysBySite(code)...");
            return deferred.promise;
        };


        this.getAllSites = function() {

            //TODO
        };

        this.exportPatientDataToExcel = function() {
            console.debug("patientSurveyService.exportPatientDataToExcel()...");
            var deferred = $q.defer();
            var serviceUrl = baseUrl + '/exportpatienttoexcel';
            console.debug("The service url is " + serviceUrl);
            $http({
                method: 'GET',
                url: serviceUrl,
                headers: {'Content-Type': 'application/json'}
            }).
            success(function(response) {
                console.debug("Patient export to Excel successful...");
                deferred.resolve({data: response.data});
                data = response.data;
            }).
            error(function() {
                console.error("/exportpatienttoexcel service call failed...");
                $log.error('Service call failed while performing exportPatientDataToExcel function...');
                data = "{'message' : 'error'}";
                deferred.reject(data);
            });
            return deferred.promise;
        };

    })
    .service('physicianSurveyService', function($http, $q, $log) {
        console.debug("Entering physicianSurveyService...");

        var data = new Array();

        this.initializePhysicianSurvey = function() {
            return {
                site_code: "",
                rating: "",
                whyfeeling: "",
                createdate: "",
                comment: ""
            };
        };

        this.initializePhysicianSurveys = function() {
            return [{
                site_code: "",
                createdate: "",
                whyfeeling: "",
                rating: "",
                comment: ""
            }];
        };

        this.survey = this.initializePhysicianSurvey();

        /**
         *
         * @returns {promise.promise|jQuery.promise|d.promise|promise|jQuery.ready.promise|qFactory.Deferred.promise|*}
         */
        this.refreshPhysicianSurveys = function() {
            console.debug("Entering physicianSurveyService.getAllPhysicianSurveys()...");
            var deferred = $q.defer();
            var serviceUrl = baseUrl + '/getallsurveys';
            console.debug('The URL is ' + serviceUrl);
            $http({
                method: 'GET',
                url: serviceUrl,
                headers: {'Content-Type': 'application/json'}
            }).
            success(function(response) {
                console.debug(serviceUrl);
                deferred.resolve({data: response.data});
                data = response.data;
                console.debug(data);  //FOR DEBUG PURPOSES ONLY
            }).
            error(function(){
                console.error("Service call failure...");
                $log.error('Service call failed while performing getAllPhysicianSurveys() function...');
                data = "{'message' : 'error'}";
                deferred.reject(data);
            });
            console.debug("Exiting physicianSurveyService.getAllPhysicianSurveys()...");
            return deferred.promise;
        };

        /**
         *
         * @param code
         */
        this.getFilteredPhysicianSurveysBySite = function(code) {
            console.debug("physicianSurveyService.getFilteredPhysicianSurveysBySite()...");
            var deferred = $q.defer();
            var serviceUrl = baseUrl + '/getsurveybysite/' + code;
            console.debug('The URL is ' + serviceUrl);
            $http({
                method: 'GET',
                url: serviceUrl,
                headers: {'Content-Type': 'application/json'}
            }).
            success(function(response) {
                console.debug(serviceUrl);
                deferred.resolve({data: response.data});
                data = response.data;
                console.debug(data);  //FOR DEBUG PURPOSES ONLY
            }).
            error(function(){
                console.error("Service call failure...");
                $log.error('Service call failed while performing getFilteredPhysicianSurveysBySite(code) function...');
                data = "{'message' : 'error'}";
                deferred.reject(data);
            });
            console.debug("Exiting physicianSurveyService.getFilteredPhysicianSurveysBySite(code)...");
            return deferred.promise;
        };


        /**
         *
         */
        this.exportPhysicianDataToExcel = function() {
            console.debug("Entering physicianSurveyService.exportPhysicianDataToExcel()...");
            var deferred = $q.defer();
            var serviceUrl = baseUrl + '/exportphysiciantoexcel';
            console.debug('The URL is ' + serviceUrl);
            $http({
                method: 'GET',
                url: serviceUrl,
                headers: {'Content-Type': 'application/json'}
            }).
            success(function(response) {
                console.debug(serviceUrl);
                deferred.resolve({data: response.data});
                data = response.data;
                console.debug(data);  //FOR DEBUG PURPOSES ONLY
            }).
            error(function(){
                console.error("Service call failure...");
                $log.error('Service export data to Excel when calling exportPhysicianDataToExcel function...');
                data = "{'message' : 'error'}";
                deferred.reject(data);
            });
            console.debug("Exiting physicianSurveyService.exportPhysicianDataToExcel...");
        };
    })
    .service('institutionService', function($http, $q, $log){
        console.debug("Entering institutionService...");

        /**
         *
         * <p>
         *     API: <code>http://localhost:8080/satterfieldmedical/insertsite/2.0/DEMO/Hospital/ZN-SG/physician</code>
         * </p>
         * @param formData
         */
        this.addInstitution = function(site) {
            console.debug("Entering surveyService.addInstitution...");
            var deferred = $q.defer();
            //var serviceUrl = baseUrl + '/insertsite/' + site.code + '/' + site.name;
            var serviceUrl = baseUrl + '/insertsite/2.0/' + site.code + '/' + site.name + '/' + site.country + '/' + site.type;
            console.debug('The URL is ' + serviceUrl);
            $http({
                method: "GET",
                url: serviceUrl,
                headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                data: $.param(site)
            }).
            success(function(response){
                deferred.resolve({data: response});
                console.debug(response);
                console.info("New institution added");
            }).
            error(function() {
                console.error("Error occurred while attempting to add a new institution");
                $log.error('Error occurred while attempting to add a new institution');
                data = "{'message' : 'error'}";
                deferred.reject(data);
            });
            console.debug("Exiting surveyService.addInstitution...");
        };

        this.refreshInstitutions = function() {
            console.debug("Entering Institutions.getAllInstitutions()...");
            var deferred = $q.defer();
            var serviceUrl = baseUrl + '/sites';
            console.debug('The URL is ' + serviceUrl);
            $http({
                method: 'GET',
                url: serviceUrl,
                headers: {'Content-Type': 'application/json'}
            }).
            success(function(response) {
                console.debug(serviceUrl);
                deferred.resolve({data: response.data});
                data = response.data;
                console.debug(data);  //FOR DEBUG PURPOSES ONLY
            }).
            error(function(){
                console.error("Service call failure...");
                $log.error('Service call failed while performing getAllInstitutions() function...');
                data = "{'message' : 'error'}";
                deferred.reject(data);
            });
            console.debug("Exiting Institutions.getAllInstitutions()...");
            return deferred.promise;
        };

        this.getPatientInstitutionsByLocale = function(locale) {
            console.debug("Entering Institutions.getPatientInstitutionsByLocale(locale)...");
            var deferred = $q.defer();
            var serviceUrl = baseUrl + '/sites/locale/patient/' + locale;
            console.debug('The URL is ' + serviceUrl);
            $http({
                method: 'GET',
                url: serviceUrl,
                headers: {'Content-Type': 'application/json'}
            }).
            success(function(response) {
                console.debug(serviceUrl);
                deferred.resolve({data: response.data});
                data = response.data;
                console.debug(data);  //FOR DEBUG PURPOSES ONLY
            }).
            error(function(){
                console.error("Service call failure...");
                $log.error('Service call failed while performing getPatientInstitutionsByLocale(locale) function...');
                data = "{'message' : 'error'}";
                deferred.reject(data);
            });
            console.debug("Exiting Institutions.getPatientInstitutionsByLocale(locale)...");
            return deferred.promise;
        };


        this.deleteInstitution = function(objId) {
            console.debug("::ENTER:: institutionService.deleteInstitution(objId)");
            var deferred = $q.defer();
            var serviceUrl = baseUrl + "/deletesite/" + objId;
            $http({
                method: "POST",
                url: serviceUrl,
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            }).
            success(function(response){
                console.info("delete call succeeded for " + objId);
                deferred.resolve({data: response});
                console.debug(response);
            }).error(function() {
                console.error("delete call failed for " + objId);
            });
            console.debug("::EXIT:: institutionService.deleteInstitution(objId)");
            return deferred.promise;
        };
    })
    .controller('patientSurveyController', function($log, $scope, patientSurveyService, institutionService, PatientSurvey, PhysicianSurvey, Institutions) {
        console.debug("Entering controller...");
        var survey = this;
        $scope.exportUrl = commonExportUrl + "/patient_survey.xls";
        $scope.appTitle = "Satterfield Services International";
        $scope.surveyData = patientSurveyService.initializeSurveys();
        $scope.patientSurveys = [];
        $scope.physicianSurveys = [];
        $scope.institutions = [];
        //$scope.institutions = [{ "code" : "DEMO", "name" : "Demo Medical" }, { "code" : "SAMP", "name" : "Sample Hospital" }]
        $scope.addInstitutionFormData = {};
        $scope.test = "Satterfield Test";
        $scope.baseUrl = urlPrefix;
        $scope.locale = "zh-cn";

        /**
         *
         */
        $scope.getAllPatientSurveys = function() {
            console.debug("patientSurveyController.getAllPatientSurveys()...");
            var surveyPromise = patientSurveyService.getAllPatientSurveys();
            surveyPromise.then(function(promise) {
                $scope.surveyData = promise.data;
            });
            console.debug("At end of patientSurveyController.getAllPatientSurveys()...");
            console.debug($scope.surveyData);
            console.debug("test");
        };

        $scope.getFilteredPatientSurveysBySite = function(code) {
            console.debug("patientSurveyController.getFilteredPatientSurveysBySite("+ code + ")...");
            var surveyPromise = patientSurveyService.getFilteredPatientSurveysBySite(code);
            surveyPromise.then(function(promise) {
                $scope.patientSurveys = promise.data;
            });
            console.debug($scope.patientSurveys);
        }

        /**
         *
         */
        $scope.getAllSites = function() {
            console.debug("patientSurveyController.getAllInstitutions()...");
            var sitePromise = patientSurveyService.getAllSites();
            //TODO
            console.debug("At end of patientSurveyController.getAllInstitutions()...");
        };

        $scope.exportPatientDataToExcel = function() {
            console.debug("patientSurveyController.exportPatientDataToExcel()...");
            var exportPatientPromise = patientSurveyService.exportPatientDataToExcel();
            exportPatientPromise.then(function(promise) {
                $scope.surveyData = promise.data;
            });
            //TODO
        };

        $scope.logout = function() {
            console.debug("Logout of dashboard...");
            location.href = 'login.html';
        };

        $scope.welcome = function() {
            console.debug("go to welcome screen");
            location.href = urlPrefix + "/admin.html#/home";
        };

        $scope.gotoInstitutions = function() {
            console.debug("go to welcome screen");
            location.href = urlPrefix + "/admin.html#/institutions";
        };

        $scope.setCountryTo = function(country) {
            console.debug("::ENTER:: patientSurveyController.setCountryTo(country)...");
            //TODO add on the fly localization here
            switch(country) {
                case 'zh-cn':
                    $scope.locale = "Mainland China";
                    break;
                case 'zh-hk':
                    $scope.locale = "Hong Kong";
                    break;
                case 'zh-tw':
                    $scope.locale = "Taiwan";
                    break;
                case 'zh-sg':
                    $scope.locale = "Singapore";
                    break;
                case 'ko':
                    $scope.locale = "South Korea";
                    break;
                case 'ja':
                    $scope.locale = "Japan";
                    break;
                default:
                    $scope.locale = "United States of America";
            }
            localkey = country;
            alert("Locale set to " + country + "!");
            Institutions.getPatientInstitutionsByLocale(country).then(function(institutions) {
                console.debug("institutionController.ggetPatientInstitutionsByLocale(country)...");
                $scope.institutions = institutions.data;
                console.debug($scope.institutions);
                return institutions.data;
            }, function(error) {
                console.error(error.message);
                $log.error(error.message);
            });

            console.debug("::EXIT:: patientSurveyController.setCountryTo(country)...");
        };

        PatientSurvey.getAllPatientSurveys().then(function(surveys) {
            $scope.patientSurveys = surveys.data;
        }, function(error) {
            console.error(error.message);
            $log.error(error.message);
        });

        /*
        Institutions.getAllInstitutions().then(function(institutions) {
            console.debug("institutionController.getAllInstitutions()...");
            $scope.institutions = institutions.data;
            console.debug($scope.institutions);
            return institutions.data;
        }, function(error) {
            console.error(error.message);
            $log.error(error.message);
        });
        */

        Institutions.getPatientInstitutionsByLocale($scope.locale).then(function(institutions) {
            console.debug("institutionController.ggetPatientInstitutionsByLocale(country)...");
            $scope.institutions = institutions.data;
            console.debug($scope.institutions);
            return institutions.data;
        }, function(error) {
            console.error(error.message);
            $log.error(error.message);
        });

    }).controller('physicianSurveyController', function($log, $scope, PhysicianSurvey, physicianSurveyService, institutionService, Institutions){
        console.debug("Entering physicianSurveyController...");
        $scope.exportUrl = commonExportUrl + "/physician_survey.xls";
        $scope.physicianSurveys = [];
        $scope.institutions = [];

        PhysicianSurvey.getAllSurveys().then(function(surveys) {
            $scope.physicianSurveys = surveys.data;
        }, function(error) {
            console.error(error.message);
            $log.error(error.message);
        });

        $scope.getFilteredPhysicianSurveysBySite = function(code) {
            console.debug("patientSurveyController.getFilteredPhysicianSurveysBySite("+ code + ")...");
            var surveyPromise = physicianSurveyService.getFilteredPhysicianSurveysBySite(code);
            surveyPromise.then(function(promise) {
                $scope.physicianSurveys = promise.data;
            });
            console.debug($scope.physicianSurveys);
        };

        $scope.exportPhysicianDataToExcel = function() {
            console.debug("::ENTER:: physicianSurveyController.exportPhysicianDataToExcel()...");
            physicianSurveyService.exportPhysicianDataToExcel();
            console.debug("Export complete!");
        };

        Institutions.getAllInstitutions().then(function(institutions) {
            console.debug("institutionController.getAllInstitutions()...");
            $scope.institutions = institutions.data;
            console.debug($scope.institutions);
            return institutions.data;
        }, function(error) {
            console.error(error.message);
            $log.error(error.message);
        });

    }).controller('institutionController', function($log, $scope, Institutions, institutionService) {
        console.debug("Entering institutionController...");
        $scope.institutions = [];
        $scope.site = {};

        $scope.addInstitution = function(site){
            console.debug("Entering institutionController.addInstitution()...");
            $scope.site = site;
            institutionService.addInstitution(site);
            console.debug($scope.site);
            $scope.refreshInstitutions();
            console.debug("test here...");
        };

        $scope.refreshInstitutions = function() {
            var promise = institutionService.refreshInstitutions();
            promise.then(function(promise) {
                $scope.institutions = promise.data;
            });
        };

        $scope.getPatientInstitutionsByLocale = function(locale) {
            var promise = institutionService.getPatientInstitutionsByLocale(locale);
            promise.then(function(promise) {
                $scope.institutions = promise.data;
            });
        };


        $scope.deleteInstitution = function(objId) {
            console.debug("::ENTER:: institutionController.deleteInstitution(" + objId + ")...");
            var promise = institutionService.deleteInstitution(objId);
            promise.then(function(promise) {
                Institutions.getAllInstitutions();  // may remove this later
            });
            $scope.refreshInstitutions();
            console.debug("::EXIT:: institutionController.deleteInstitution(objId)...");
        };

    if(localkey == '') {
        Institutions.getAllInstitutions().then(function (institutions) {
            console.debug("institutionController.getAllInstitutions()...");
            $scope.institutions = institutions.data;
            console.debug($scope.institutions);
            return institutions.data;
        }, function (error) {
            console.error(error.message);
            $log.error(error.message);
        });
    } else {

        Institutions.getPatientInstitutionsByLocale(localkey).then(function (institutions) {
            console.debug("institutionController.ggetPatientInstitutionsByLocale(country)...");
            $scope.institutions = institutions.data;
            console.debug($scope.institutions);
            return institutions.data;
        }, function (error) {
            console.error(error.message);
            $log.error(error.message);
        });
    }
});