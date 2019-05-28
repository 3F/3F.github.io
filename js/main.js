/*
** GitHub/3F   old drafts
*/

'use strict';

class EffectCfg
{
    constructor(name, duration, param)
    {
        this.name       = name;
        this.duration   = duration;
        this.param      = param;
    }
};

const ShortInfoPrototype =
{
    EffectType:
    {
        EXPLODE:    'explode',
        DROP:       'drop',
        SLIDE:      'slide',
        BLIND:      'blind',
        BOUNCE:     'bounce',
        PUFF:       'puff'
    },

    cubes: null,

    effects:
    {
        coreVersion: '3.3.1',
        uiVersion: '1.12.1',
        cdn: 'ajax.googleapis.com',
        use: function(_) { 
            return new EffectCfg(_.EffectType.EXPLODE, 3120, {}); // ~1750 
        },
    },

    debug: false,
    
    show: function()
    {
        this.cubes._.draggable({ revert: true });

        this.cubes._.show
        (
            this.cubes.effect.name,
            this.cubes.effect.param,
            this.cubes.effect.duration,
            function() {}
        );

        this.dbg(this.show);
    },

    hide: function()
    {
        this.cubes._.hide();
        this.dbg(this.hide);
    },

    load: function(url, onload)
    {
        var script      = document.createElement('script');
        script.src      = url;
        script.onload   = onload || function() { };

        document.head.appendChild(script);
    },

    ctor: function(cubes, debug, onInit)
    {
        cubes       = document.getElementsByClassName(cubes)[0];
        this.debug  = debug;

        if(!cubes) {
            throw new Error('cubes not found');
        }

        let l = 'https://' + this.effects.cdn;

        let _= this;
        _.load(l + "/ajax/libs/jquery/"+ _.effects.coreVersion  +"/jquery.min.js", function()
        {
            _.load(l + "/ajax/libs/jqueryui/"+ _.effects.uiVersion  +"/jquery-ui.min.js", function()
            {
                _.dbg('Ready for effects');

                _.cubes = {
                    _: $(cubes),
                    effect: _.effects.use(_)
                };

                _.hide();

                if(!onInit) {
                    return;
                }

                onInit();
                _.dbg(onInit);
            });
        });

        this.dbg('ctor');
    },

    dbg: function(msg)
    {
        if(this.debug) {
            console.log(msg);
        }
    }
};

const ShortInfo             = ShortInfoPrototype.ctor;
ShortInfo.prototype         = ShortInfoPrototype;
ShortInfo.prototype.ctor    = null;

document.addEventListener("DOMContentLoaded", function()
{
    let info = new ShortInfo('pre-cubes', false, function() {
        info.show();
    });
});