(function () {
    angular
        .module('cybersponse')
        .controller('incidentCorrelations210Ctrl', incidentCorrelations210Ctrl);

    incidentCorrelations210Ctrl.$inject = ['$scope', 'correlationGraphService', 'ViewTemplateService', 'toaster', 'settingsService', 'config', '_', 'appModulesService', '$filter', '$state', '$window', '$interpolate', '$resource', 'API'];

    function incidentCorrelations210Ctrl($scope, correlationGraphService, ViewTemplateService, toaster, settingsService, config, _, appModulesService, $filter, $state, $window, $interpolate, $resource, API) {
        $scope.config = config;
        $scope.refresh = refresh;
        $scope.isFullscreen = false;
        $scope.layout = 'Tree';
        $scope.options = {};
        $scope.zoomLevel = 1;

        var interpolateObject = JSON.parse($state.params.qparam);
        var entityId = $interpolate(config.entityId)(interpolateObject);
        $scope.entityName = 'incidents';
        $resource(API.BASE + 'incidents').get({id:entityId}, function(data) {
            $scope.entityId = $filter('getEndPathName')(data['hydra:member'][0]['@id']);
            _init();
        });
        var selectedNode;

        function _init(type) {
            $scope.processing = true;
            $scope.correlationConfig = {};
            settingsService.getSystem().then(function (setting) {
                if ((_.isObject(setting.publicValues.correlationConfig) && angular.equals({}, setting.publicValues.correlationConfig)) || _.isArray(setting.publicValues.correlationConfig)) {
                    $scope.correlationWarning = 'Please configure correlation setting.';
                    $scope.processing = false;
                    return;
                } else if (!setting.publicValues.correlationConfig) {
                    ViewTemplateService.getSystemViewTemplates('', 'settings').then(function(response) {
                        if(response.data['hydra:member'].length > 0) {
                          _.each(response.data['hydra:member'], function(setting) {
                            var moduleType = setting.uuid.split('-')[1];
                            if(setting.config && setting.config.correlationConfig) {
                              setting.config.correlationConfig = angular.isArray(setting.config.correlationConfig) ? {} : setting.config.correlationConfig;
                              if(Object.keys(setting.config.correlationConfig).length > 0) {
                                $scope.correlationConfig[moduleType] = setting.config.correlationConfig;
                              }
                            }
                          });
                          _getNodeData();
                        } else {
                          $scope.correlationWarning = 'Please configure correlation setting.';
                          $scope.processing = false;
                          return;
                        }
                    });
                } else {
                    $scope.correlationConfig = setting.publicValues.correlationConfig;
                    _getNodeData();
                }
            });

            $scope.layoutChanged = function (layout) {
                $scope.layout = layout;
                if ($scope.options.network) {
                    $scope.options.buildGraph($scope.layout);
                }
            };
            $scope.fit = function () {
                if ($scope.options.network) {
                    $scope.options.network.fit();
                }
            };

            $scope.zoom = function (zoomLevel) {
                if ($scope.options.network) {
                    $scope.options.network.moveTo({ scale: zoomLevel });
                    $scope.zoomLevel = zoomLevel;
                }
            };

            if (type === 'refresh' && $scope.options.network) {
                $scope.options.buildGraph($scope.config.layout);
            }

        }

        function _getNodeData() {
            $scope.correlationConfig.depth = 3;
            correlationGraphService.getNodeData($scope.correlationConfig, $scope.entityName, $scope.entityId).then(function (data) {
                $scope.field = {
                    'name': $scope.entityName,
                    'value': JSON.stringify(data)
                };
                $scope.graphLegends = _.uniq(data.nodes, false, function (macro) {
                    return macro.moduleType;
                });

            }, function () {
                toaster.error({
                    body: 'Error in fetching correlation data.'
                });
            }).finally(function () {
                $scope.processing = false;
            });
        }

        $scope.onView = function (newTab) {
            var model = $filter('getModuleName')(selectedNode);
            var state = appModulesService.getState(model);
            var params = {
                module: model,
                id: $filter('getEndPathName')(selectedNode)
            };
            var leavingViewPanel = state.indexOf('viewPanel') === -1 && $state.current.name.indexOf('viewPanel') !== -1;
            if (newTab || leavingViewPanel) {
                var url = $state.href(state, params);
                $window.open(url, '_blank');
            } else {
                $state.go(state, params);
            }
        };

        function refresh() {
            _init('refresh');
        }

    }
})(); 
