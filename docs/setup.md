| [Home](../README.md) |
|--------------------------------------------|

# Installation
1. To install a widget, click **Content Hub** > **Discover**.
2. From the list of widget that appears, search for and select **Incident Correlations**.
3. Click the card of the **Incident Correlations** widget.
4. Click **Install** on the bottom to begin installation.

# Configuration
**Configure Inputs**

To use the Incident Correlations widget you must defined the input variable that will be used to specify the incident ID whose correlations you want to view. To view the configured Incident Correlations widget, for example, on the Dashboards page, you must define the input variable on the Dashboards page:

1. Log on to FortiSOAR.
2. On the Dashboard bar, click the **Actions** icon and select **Edit Dashboard**.
3. On the `Template Editing Mode Enabled` page, click **Configure Inputs**.
4. In the **Configure Inputs** dialog, configure the input variable according to your requirements:
   1. (Optional) Select the **Enable Auto-Refresh** option to automatically refresh your dashboard after the set time interval. By default, the time interval is set at 10 minutes. You can modify the time interval according to your requirements.
   2. Click **Add New Input**.
   3. From the **Input Type** drop-down list, select the type of field that is going to be applied as the input variable. For our example, we are going to use the 'Incident ID' to display the correlations for a specific incident, so select **Number** from the list.
   4. In the **Label** field, type the name that describes this variable. In our example, type `Incident ID`.
      The **Identifier** field gets automatically populated with the identifier based on the "**Label**" you have specified. In our example, it gets populated as **incidentID**. The value that is present in the Identifier field is the key by which this variable will be identified.
   5. (Optional) In the **Default Value** field, choose the value based on which the widget will be displayed, by default. In our example, we do not specify any default value.
   6. (Optional) To make the input field mandatory, click the **Required** checkbox. If you select the Required checkbox, then the widget gets displayed if the default value is specified in the **Default Value** field, else it does not get displayed unless users provide the 'Input', and instead a message such as '`Please provide required inputs to load the dashboard`' is displayed.  
      <img src="https://raw.githubusercontent.com/fortinet-fortisoar/widget-incident-correlations/release/2.1.0/docs/media/incident_correlations_ConfigureInputs.png" alt="Providing inputs to the Incident Correlation Widget" style="border: 1px solid #A9A9A9; border-radius: 4px; padding: 10px; display: block; margin-left: auto; margin-right: auto;">
   7. Click **Save** to save the variable.

**Incident Correlations Widget Settings** 

Edit the page, for example, Dashboard, where you want to add the Incident Correlations widget. On the `Template Editing Mode Enabled` page, add the Incident Correlations widget, and then click **Edit** to edit its settings:
<img src="https://raw.githubusercontent.com/fortinet-fortisoar/widget-incident-correlations/release/2.1.0/docs/media/incident_correlations_edit.png" alt="Editing the Incident Correlations widget" style="border: 1px solid #A9A9A9; border-radius: 4px; padding: 10px; display: block; margin-left: auto; margin-right: auto;">

Provide the following details to customize the Incident Correlations widget to suit your requirements:

| Fields                            | Description                              |
| --------------------------------- | ---------------------------------------- |
| Incident Correlation Widget Title | Specify the heading or title of the image that represents the correlations, such as alerts, tasks, etc. of the specific incident. |
| Incident Node ID                  | This widget uses the 'Configure Inputs' option to define the input variable that will be used to specify the incident ID whose correlations you want to view. The **Configure Inputs** section defines the steps for configuring the 'Configure Inputs' option. |
| Background                        | Select the background from either a dotted or a plain background. |
