(function () {
    angular
        .module('cybersponse')
        .controller('editIncidentCorrelations210Ctrl', editIncidentCorrelations210Ctrl);

    editIncidentCorrelations210Ctrl.$inject = ['$scope', 'config', '$uibModalInstance', 'settingsService', '_', 'ViewTemplateService'];

    function editIncidentCorrelations210Ctrl($scope, config, $uibModalInstance, settingsService, _, ViewTemplateService) {
        $scope.config = config || { 'nodeLevels': [] };
        if (!$scope.config.nodeLevels) {
            $scope.config.nodeLevels = [];
        }
        $scope.config.background= $scope.config.background?$scope.config.background:'dotted';
        $scope.config.layout= $scope.config.layout?$scope.config.layout:'Hub and Spoke';
        $scope.cancel = cancel;
        $scope.save = save;
        $scope.expressions = angular.copy(ViewTemplateService.getConfigInputs());
        $scope.sortableOptions = {
            orderChanged: nodeLevelsReordered
        };

        settingsService.getSystem().then(function (setting) {
            if ((_.isObject(setting.publicValues.correlationConfig) && angular.equals({}, setting.publicValues.correlationConfig)) || _.isArray(setting.publicValues.correlationConfig)) {
                $scope.correlationWarning = 'Please configure correlation setting.';
                return;
            }
            _.each(setting.publicValues.correlationConfig, function (modules, key) {
                var nodeLevelDefined = _.find($scope.config.nodeLevels, function (module) {
                    return module.name === key;
                });
                if (!nodeLevelDefined) {
                    $scope.config.nodeLevels.push({ 'name': key });
                }
            });
            setOrderIndex($scope.config.nodeLevels);
        });

        function nodeLevelsReordered() {
            $scope.visualCorrelationForm.$setDirty();
            setOrderIndex($scope.config.nodeLevels);
        }

        function setOrderIndex(nodes) {
            var count = 1;
            nodes.forEach(function (node) {
                node.level = count;
                count++;
            });
        }

        function cancel() {
            $uibModalInstance.dismiss('cancel');
        }

        function save() {
            if ($scope.visualCorrelationForm.$invalid) {
                $scope.visualCorrelationForm.$setTouched();
                $scope.visualCorrelationForm.$focusOnFirstError();
                return;
            }
            $uibModalInstance.close($scope.config);
        }

    }
})(); 
