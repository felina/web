module.exports = Backbone.View.extend({
    tagName: 'select',
    className: 'form-control',
    id: 'species-list',
    initialize: function(opts) {
        opts = opts || {};
        this.onFeatureLoad = opts.onFeatureLoad;
        this.onFeatureError = opts.onFeatureError;
    },
    render: function() {
        var that = this;

        api.getSpecies(function(data) {
            if (!data.res) {
                alert('Failed to load project list');
                return;
            }

            _.each(data.projects, function(project){
                var opt = $('<option>').attr('value', project.name).text(project.name);
                that.$el.append(opt);
            });

            api.getFeatures(data.projects[0].projectid, that.onFeatureLoad, that.onFeatureError);
        });

        return this;
    },
    events: {
        'change': 'select'
    },
    select: function() {
        console.log(this.$el.find(":selected").text());
    }
});
