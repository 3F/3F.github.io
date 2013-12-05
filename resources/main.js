/*
 * Copyright (c) 2013 Developed by reg <entry.reg@gmail.com>
 * 
 * Distributed under the MIT license
 * (see accompanying file LICENSE or a copy at http://opensource.org/licenses/MIT)
*/

var Effects =   
{
    EXPLODE: 'explode',
    DROP:    'drop',
    BLIND:   'blind',
    BOUNCE:  'bounce',
    PUFF:    'puff'
};

var EffectCfg = function(name, duration)
{
    this.name       = name;
    this.duration   = duration;
};

var ShortInfo = function(cubes, sources)
{
    this.cubes      = cubes;
    this.sources    = sources;
    this.effect     = new EffectCfg(Effects.EXPLODE, 3120); //1750
};

ShortInfo.prototype.hide = function()
{
    this.cubes.hide();
    this.sources.hide();
};

ShortInfo.prototype.show = function()
{
    this.cubes.draggable({ revert: true });
    
    var sources = this.sources;
    this.cubes.show(this.effect.name, {}, this.effect.duration, function(){
        sources.show("slow");
    });
};

ShortInfo.prototype.setEffect = function(effect)
{
    this.effect = effect;
};