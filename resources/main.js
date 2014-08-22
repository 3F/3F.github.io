/*
 * Copyright (c) %year% Developed by reg <entry.reg@gmail.com>
 * 
 * Distributed under the MIT license
 * (see accompanying file LICENSE or a copy at http://opensource.org/licenses/MIT)
*/

'use strict';

var ShortInfoPrototype =
{
    EffectType: 
    {
        EXPLODE: 'explode',
        DROP:    'drop',
        SLIDE:   'slide',
        BLIND:   'blind',
        BOUNCE:  'bounce',
        PUFF:    'puff'
    },
    
    cubes: null,
    arrow: null,
    code:  null,
    
    EffectCfg: function(name, duration, param)
    {
        this.name       = name;
        this.duration   = duration;
        this.param      = param;
    },
    
    hide: function()
    {
        this.cubes._.hide();
        this.arrow._.hide();
    },
    
    show: function()
    {
        this.cubes._.draggable({ revert: true });
        
        var arrow = this.arrow;
        this.cubes._.show(
                this.cubes.effect.name, 
                this.cubes.effect.param, 
                this.cubes.effect.duration, 
                function() {
                    arrow._.show(
                        arrow.effect.name, arrow.effect.param, arrow.effect.duration
                    );
                }
        );
    },
    
    attachArrowClick: function(target)
    {
        this.arrow._.click(function(e)
        {
            target._.hide(target.effect.name, {}, target.effect.duration);
            
            setTimeout(function(){
                target._.show(target.effect.name, target.effect.param, target.effect.duration);
            }, target.effect.param.delay);
        });        
    },
    
    detachArrowClick: function()
    {
        this.arrow._.off('click');
    },
    
    construct: function(code, cubes, arrow)
    {
        this.cubes  = {
            _: cubes,
            effect: new this.EffectCfg(this.EffectType.EXPLODE, 3120, {}) //1750
        };
        
        this.arrow  = {
            _: arrow,
            effect: new this.EffectCfg(this.EffectType.DROP, 750, {direction: 'right'})
        };
        
        this.code   = {
            _: code,
            effect: new this.EffectCfg(this.EffectType.DROP, 750, {direction: 'right', delay: 4000})
        };
        
        this.hide();
        this.attachArrowClick(this.code);
    }
};

var ShortInfo       = ShortInfoPrototype.construct;
ShortInfo.prototype = ShortInfoPrototype;
ShortInfo.prototype.construct = null;