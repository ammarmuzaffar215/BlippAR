var WebarSdkSurface = pc.createScript('WebarSdkSurface');


WebarSdkSurface.attributes.add('webarSdkCamera', {
    title: 'Webar Camera',
    type: 'entity'
});

WebarSdkSurface.attributes.add('webarSdkStage', {
    title: 'Webar Stage',
    type: 'entity'
});

// Map this attribute to webar-ux-control entity in the scene and define UX options
WebarSdkSurface.attributes.add('webarUXControl', {
    title: 'Webar UX Control',
    type: 'entity',
    description: 'Define this entity to enable and use the WebAR UX options.'
});

// Define a JSON attribute for UX options
WebarSdkSurface.attributes.add('webarUXControlOptions', {
    type: 'json',
    title: 'WebAR UX Options',
    schema: [
        {
            name: 'stageCursorUX',
            type: 'boolean',
            title: 'Stage Cursor UX',
            description: 'Enable or disable the stage cursor UX feature',
            default: true
        },
        {
            name: 'userGestureRotation',
            type: 'boolean',
            title: 'User Gesture Rotation',
            description: 'Allow user gesture for rotation',
            default: true
        },
        {
            name: 'userGestureScale',
            type: 'boolean',
            title: 'User Gesture Scale',
            description: 'Allow user gesture for scaling',
            default: true
        }
    ]
});

// initialize Webar SDK with playcanvas entity details
WebarSdkSurface.prototype.initialize = function() {
    if (this.webarUXControl && this.webarUXControl.parent !== this.webarSdkStage) {
        console.error("To enable new UX, 'webar-ux-control' entity should be a direct child of 'webarstage'.");
        return;
    }

    if (this.webarUXControl) {
        // If webarUxControl script is found, use its options
        WEBARSDK.InitPlayCanvas('application-canvas', this.webarSdkCamera, this.webarSdkStage, this.webarUXControl, this.webarUXControlOptions);
    } else {
        // If webarUxControl script is not found, use default or no options
        WEBARSDK.InitPlayCanvas('application-canvas', this.webarSdkCamera, this.webarSdkStage);
    }
};