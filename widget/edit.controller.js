(function () {
    angular
        .module('cybersponse')
        .controller('editIncidentCorrelations210Ctrl', editIncidentCorrelations210Ctrl);

    editIncidentCorrelations210Ctrl.$inject = ['$scope', 'config', '$uibModalInstance', 'ViewTemplateService'];

    function editIncidentCorrelations210Ctrl($scope, config, $uibModalInstance, ViewTemplateService) {
        $scope.config = config || { 'nodeLevels': [] };
        if (!$scope.config.nodeLevels) {
            $scope.config.nodeLevels = [];
        }
        $scope.config.background= $scope.config.background?$scope.config.background:'dotted';
        $scope.config.layout= $scope.config.layout?$scope.config.layout:'Hub and Spoke';
        $scope.cancel = cancel;
        $scope.save = save;
        $scope.expressions = angular.copy(ViewTemplateService.getConfigInputs());

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
