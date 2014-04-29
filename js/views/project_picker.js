/**
Backbone View for a control for selecting a project from a dropdown. Used in
the image upload form for selecting which project the image is for.
*/
module.exports = Backbone.View.extend({
    tagName: 'select',
    className: 'form-control',
    id: 'species-list',
    initialize: function(opts) {
        opts = opts || {};
        this.onFeatureLoad = opts.onFeatureLoad;
        this.onFeatureError = opts.onFeatureError;
        this.selectedID = null;
    },
    render: function() {
        var that = this;

        // Get the list of projects from the server
        api.getSpecies(function(data) {
            // Show an error if it failed to load
            if (!data.res) {
                alert('Failed to load project list');
                return;
            }

            // Add each project name to the picker
            _.each(data.projects, function(project){
                var opt = $('<option>').attr('value', project.projectid).text(project.name);
                that.$el.append(opt);
            });

            // Store the ID of the first project in the list
            that.selectedID = data.projects[0].projectid;

            // Download the list of features for the default project, and pass
            // them to the callback
            api.getFeatures(that.selectedID, that.onFeatureLoad, that.onFeatureError);
        });

        return this;
    },
    events: {
        'change': 'select'
    },
    select: function() {
        this.selectedID = this.$el.val();
    }
});
