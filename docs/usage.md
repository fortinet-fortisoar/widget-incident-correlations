| [Home](../README.md) |
|--------------------------------------------|

# Usage

The Incident Correlations widget displays the correlations of an incident with other module records such as alerts, indicators, IOCs, tasks, war rooms, etc.

## Using the Incident Correlations Widget

An example of using the Incident Correlations widget would be to display the correlations of a specific incident based on a defined input variable. For our example, we have defined the input variable as 'incidentID' (see [setup](setup.md)) and we want to view the correlations of an incident whose ID is '1', on a Dashboard. To view the dashboard that contains this widget, on that Dashboard's page, click **Input**, and in the `Configure Dashboard Input` dialog, in the **Incident ID** field, type `1`:  
<img src="https://raw.githubusercontent.com/fortinet-fortisoar/widget-incident-correlations/release/2.1.0/docs/media/incident_correlations_inputs.png" alt="Providing inputs to the Incident Correlation Widget" style="border: 1px solid #A9A9A9; border-radius: 4px; padding: 10px; display: block; margin-left: auto; margin-right: auto;">

> NOTE: Before you specify the Incident ID for which you want to view the correlations, the Dashboard is not displayed and instead a message such as '`Please provide required inputs to load the dashboard`' is displayed.

The widget gets displayed on the Dashboard page as shown in the following image:

<img src="https://raw.githubusercontent.com/fortinet-fortisoar/widget-incident-correlations/release/2.1.0/docs/media/incident_correlations_view.png" alt="Viewing the Incident Correlations Widget on the Dashboard page" style="border: 1px solid #A9A9A9; border-radius: 4px; padding: 10px; display: block; margin-left: auto; margin-right: auto;">
