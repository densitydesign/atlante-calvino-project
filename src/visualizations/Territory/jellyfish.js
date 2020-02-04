
import { draw_arc, draw_line, draw_point, draw_text, split_text } from './jellyfish_graphical_functions.js';
import { normalizeAngle } from './support_functions';

/*
function calculate_jellyfishes_offset(jellyfish1, jellyfish2)
{
  if(jellyfish1.children.length == 0 || jellyfish2.children.length == 0) return 0;

  let border_map1 = calculate_jellyfish_border_map(jellyfish1);
  let border_map2 = calculate_jellyfish_border_map(jellyfish2);

  let shared_levels = Math.min(border_map1.length, border_map2.length);

  let min_offset_found = 0;

  for(let i = 0; i < shared_levels; ++i)
  {
    let border1 = border_map1[i];
    let border2 = border_map2[i];

    min_offset_found = Math.max(min_offset_found, border1.right + Math.abs(border2.left));
  }

  return min_offset_found;
}
*/

function calculate_width(hierarchy)
{
  if(hierarchy.children.length === 0) return 1;
  else
  {
    let children_total = 0;

    for(let i = 0; i < hierarchy.children.length; ++i)
    {
      children_total += calculate_width(hierarchy.children[i]);
    }

    return children_total;
  }
}

function calculate_continuous_extension(hierarchy)
{
  let direct_child_gap = 1;
  let hierarchy_gap = 1;

  if(hierarchy.children.length === 0) return 0;
  else if(hierarchy.children.every(d => d.children.length === 0)) return (hierarchy.children.length - direct_child_gap);
  else
  {
    let total = 0;

    for(let i = 0; i < hierarchy.children.length; ++i)
    {
      total += calculate_continuous_extension(hierarchy.children[i]);
    }

    total += hierarchy_gap * (hierarchy.children.length - 1);

    return total;
  }
}

function process_hierarchy(hierarchy, x, y, colors)
{
  let jellyfish = {
    caption : hierarchy.caption,
    type : hierarchy.type,
    position : { x : x, y : y },
    children : []
  };
/*
  switch(hierarchy.type)
  {
      case "generico_terrestre"     : jellyfish.color = colors.generico_terrestre_bright;   break;
      case "generico_non_terrestre" : jellyfish.color = colors.generico_cosmico_bright;  break;
      case "nominato_terrestre"     : jellyfish.color = colors.nominato_terrestre_bright; break;
      case "nominato_non_terrestre" : jellyfish.color = colors.nominato_cosmico_bright;  break;
      case "inventato"              : jellyfish.color = colors.inventato_bright; break;
      case "no_ambientazione"       : jellyfish.color = colors.no_ambientazione_bright;  break;
  }
*/
  jellyfish.color = map_color(hierarchy.type, colors);

  let progressive_x = x;
  hierarchy.children.forEach(d => {
    jellyfish.children.push(process_hierarchy(d, progressive_x, y + 1, colors))
    progressive_x = progressive_x + calculate_width(d);
  });

  return jellyfish;
}

function process_hierarchy_continuously(hierarchy, x, y, colors)
{
  let jellyfish = {
    text_id : hierarchy.text_id,
    node_id : hierarchy.node_id,
    caption : hierarchy.caption,
    hasPoint : hierarchy.hasPoint,
    level : hierarchy.level,
    basal_type : hierarchy.basal_type,
    local_type : hierarchy.local_type,
    logical_position : { x : x, y : y },
    stripe_position : { x : 0, y : 0 },
    circle_position : { x : 0, y : 0 },
    children : []
  };
/*
  switch(hierarchy.basal_type)
  {
      case "generico_terrestre"     : jellyfish.color = colors.generico_terrestre_bright;   break;
      case "generico_non_terrestre" : jellyfish.color = colors.generico_cosmico_bright;  break;
      case "nominato_terrestre"     : jellyfish.color = colors.nominato_terrestre_bright; break;
      case "nominato_non_terrestre" : jellyfish.color = colors.nominato_cosmico_bright;  break;
      case "inventato"              : jellyfish.color = colors.inventato_bright; break;
      case "no_ambientazione"       : jellyfish.color = colors.no_ambientazione_bright;  break;
  }
*/
  jellyfish.color = map_color(hierarchy.basal_type, colors);

  let hierarchy_gap = 1;
  let absolute_progressive_x = x;
  let relative_progressive_x = 0;

  for(let i = 0; i < hierarchy.children.length; ++i)
  {
    jellyfish.children.push(process_hierarchy_continuously(hierarchy.children[i], absolute_progressive_x, y + 1, colors));

    let delta = 0;

    if(i < hierarchy.children.length - 1) delta += hierarchy_gap;

    delta += calculate_continuous_extension(hierarchy.children[i]);

    relative_progressive_x += delta;
    absolute_progressive_x += delta;
  }

  jellyfish.logical_position.x = x + relative_progressive_x / 2;

  return jellyfish;
}

export function visit(hierarchy, status, processItem)
{
  processItem(hierarchy, status);

  hierarchy.children.forEach(d => visit(d, status, processItem));
}

function visit_level(hierarchy, level, status, processItem)
{
  if(+hierarchy.level > level) return;
  else if(+hierarchy.level === level) processItem(hierarchy, level, status);
  else hierarchy.children.forEach(d => visit_level(d, level, status, processItem));
}

function get_max_level(hierarchy)
{
  var max_level = 0;

  visit(
    hierarchy,
    max_level,
    d => {
      max_level = Math.max(max_level, +d.level);
    });

  return max_level;
}

function visit_levels(hierarchy, status, processItem)
{
  let max_level = get_max_level(hierarchy);

  for(let level = 0; level <= max_level; ++level)
  {
    visit_level(
      hierarchy,
      level,
      status,
      processItem);
  }
}

function map_color(text, colors)
{
  switch(text)
  {
      case "generico_terrestre"     : return colors.generico_terrestre_bright;
      case "generico_non_terrestre" : return colors.generico_cosmico_bright;
      case "nominato_terrestre"     : return colors.nominato_terrestre_bright;
      case "nominato_non_terrestre" : return colors.nominato_cosmico_bright;
      case "inventato"              : return colors.inventato_bright;
      case "no_ambientazione"       : return colors.no_ambientazione_bright;

      default : return undefined;
  }  
}

function prepare_for_graphics(jellyfish, colors)
{
/*  
  switch(jellyfish.basal_type)
  {
      case "generico_terrestre"     : jellyfish.color = colors.generico_terrestre_bright;   break;
      case "generico_non_terrestre" : jellyfish.color = colors.generico_cosmico_bright;  break;
      case "nominato_terrestre"     : jellyfish.color = colors.nominato_terrestre_bright; break;
      case "nominato_non_terrestre" : jellyfish.color = colors.nominato_cosmico_bright;  break;
      case "inventato"              : jellyfish.color = colors.inventato_bright; break;
      case "no_ambientazione"       : jellyfish.color = colors.no_ambientazione_bright;  break;
  }
*/
  jellyfish.color = map_color(jellyfish.basal_type, colors);

  jellyfish.stripe_position.x = jellyfish.logical_position.x * 20 + 10;
  jellyfish.stripe_position.y = jellyfish.logical_position.y * 20 + 10;

  jellyfish.children.forEach(d => prepare_for_graphics(d, colors));
}

function draw_jellyfish_stripe(graphicsContainer, jellyfish, text_id)
{
  if(jellyfish.children.length > 0)
  {
    let target_point = { x : jellyfish.stripe_position.x, y : jellyfish.children[0].stripe_position.y };

    draw_line(
        graphicsContainer,
        {
            point1 : jellyfish.stripe_position,
            point2 : target_point
        },
        jellyfish.color);

    for(let i = 1; i < jellyfish.children.length; ++i)
    {
      draw_line(
          graphicsContainer,
          {
              point1 : jellyfish.children[i - 1].stripe_position,
              point2 : jellyfish.children[i].stripe_position
          },
          jellyfish.children[i - 1].color);
    }
  }

  draw_point(graphicsContainer, jellyfish.stripe_position, jellyfish.color, text_id);

  jellyfish.children.forEach(d => draw_jellyfish_stripe(graphicsContainer, d));
}

function getProgressiveSumMap(valueMap)
{
  let orderedKeys = Array.from(valueMap.keys()).sort();
  let values = orderedKeys.map(d => valueMap.get(d));

  var result = values.reduce((r, a) => {
    r.push((r.length && r[r.length - 1] || 0) + a);
    return r;
  }, []);

  var progressiveSum = new Map();

  for(let i = 0; i < orderedKeys.length; ++i)
  {
    progressiveSum.set(orderedKeys[i], result[i]);
  }

  return progressiveSum;
}

function MapToMap(map, f)
{
  const map2 = new Map();

  for(let [key, value] of map)
  {
    map2.set(key, f(value));
  }

  return map2;
}

function split_texts(hierarchy)
{
  const caption_split_threshold = 19;

  visit(
    hierarchy,
    {},
    d => {
      let children2 = [];

      for(let i = 0; i < d.children.length; ++i)
      {
        let child = d.children[i];

        let caption_segments = split_text(child.caption, caption_split_threshold);

        child.caption = caption_segments[0];
        child.hasPoint = true;
        children2.push(child);

        for(let j = 1; j < caption_segments.length; ++j)
        {
          let parachild_j = {
            text_id    : child.text_id,
            node_id    : child.node_id + "_" + j,
            family     : child.node_id,
            caption    : caption_segments[j],
            hasPoint   : false,
            level      : child.level,
            basal_type : child.basal_type,
            local_type : child.local_type,
            children   : []
          }

          children2.push(parachild_j);
        }
      }

      d.children = children2;
    });
}

export function prepare_jellyfish_data(hierarchy, center, radiusScaleFactor, colors)
{
  split_texts(hierarchy);
  let jellyfish = process_hierarchy_continuously(hierarchy, 0, 0, colors);

  let status2 = { extremes : { min_x : 1000000, max_x : 0 } };

  visit(
    jellyfish,
    status2,
    d => {
      status2 = { extremes : {
        min_x : Math.min(status2.extremes.min_x, d.logical_position.x),
        max_x : Math.max(status2.extremes.max_x, d.logical_position.x) } };
    });

  var min_x_value2 = 0; //status2.extremes.min_x;
  var max_x_value2 = status2.extremes.max_x;



  prepare_for_graphics(jellyfish, colors);

  let status = { extremes : { min_x : 1000000, max_x : 0 } };

  visit(
    jellyfish,
    status,
    d => {
      status = { extremes : {
        min_x : Math.min(status.extremes.min_x, d.stripe_position.x),
        max_x : Math.max(status.extremes.max_x, d.stripe_position.x) } };
    });

  var min_x_value = status.extremes.min_x;
  var max_x_value = status.extremes.max_x;
  var delta = max_x_value - min_x_value;

  var scalingCoefficient = max_x_value2 === 0 ? 1 : delta * (max_x_value2 + 1) / max_x_value2;

  visit(
    jellyfish,
    {},
    (d, status) => {
      d.angle = d.stripe_position.x / scalingCoefficient * 2 * Math.PI;

// MP20200204 - rotational fix for specific jellyfishes which give problems in default angle setting
if(d.text_id === "S008") d.angle -= Math.PI / 8;
    });

  visit(
    jellyfish,
    {},
    (d, status) => {
      if(d.level > 0 && d.children.length > 1 && d.children.every(dd => dd.children.length === 0))
      {
        let childrenAngles = d.children.map(d => d.angle);

        var averageChildrenAngle = childrenAngles
          .reduce((sum, num) => sum + num, 0) / d.children.length;

        let angleDeltas = childrenAngles.map(d => algebraicShortestAngleDifference(averageChildrenAngle, d));

        let scaling = 0.3;
        let modifiedAngleDeltas = angleDeltas.map(d => d * scaling);

        let modifiedChildrenAngles = modifiedAngleDeltas.map(d => averageChildrenAngle + d);

        for(let i = 0; i < d.children.length; ++i)
        {
          d.children[i].angle = modifiedChildrenAngles[i];
        }
      }
    });

  var level_maxTextLen_map = new Map();

  visit_levels(
    jellyfish,
    level_maxTextLen_map,
    (d, level) => {
      let maxTextLen = level_maxTextLen_map.get(level) || 0;
      level_maxTextLen_map.set(level, Math.max(maxTextLen, d.caption.length));
    });

  // set level 0 at length 0
  level_maxTextLen_map.set(0, 0);
/*
  // force first item to the hill radius, scaled
  level_maxTextLen_map.set(1, jellyfish.children[0].stripe_position.y * radiusScaleFactor);

  let level_deltaRadius_map = MapToMap(
    level_maxTextLen_map,
    d => 1 * d);
*/

  let textLenScaleFactor = 15;

  // force first item to the hill radius, scaled
  level_maxTextLen_map.set(0, jellyfish.children[0].stripe_position.y * radiusScaleFactor / textLenScaleFactor);

  let level_deltaRadius_map = MapToMap(
    level_maxTextLen_map,
    d => d * textLenScaleFactor);

  let level_progressiveRadius_map = getProgressiveSumMap(level_deltaRadius_map);

  visit(
    jellyfish,
    {},
    (d, status) => {
      if(+d.level === 0)
      {
        d.circle_position.x = center.x;
        d.circle_position.y = center.y;
        d.radius = 0;
        d.angle = 0;
      }
/*
      if(+d.level == 1)
      {
        d.angle = d.angle;
        d.radius = d.stripe_position.y * radiusScaleFactor;
//        d.radius = level_progressiveRadius_map.get(+d.level - 1) * radiusScaleFactor / 5;
console.log("d.stripe_position.y * radiusScaleFactor : " + d.stripe_position.y * radiusScaleFactor);
console.log("d.radius : " + d.radius);

        let x = Math.cos(d.angle) * d.radius + center.x;
        let y = Math.sin(d.angle) * d.radius + center.y;

        d.circle_position.x = x;
        d.circle_position.y = y;
      }
*/
      if(+d.level > 0)
      {
        d.angle = d.angle;
//        d.radius = d.stripe_position.y * radiusScaleFactor;
//        d.radius = level_progressiveRadius_map.get(+d.level - 1) * radiusScaleFactor / 5;
        d.radius = level_progressiveRadius_map.get(+d.level - 1);

        let x = Math.cos(d.angle) * d.radius + center.x;
        let y = Math.sin(d.angle) * d.radius + center.y;

        d.circle_position.x = x;
        d.circle_position.y = y;
      }
    });

  return jellyfish;
}

function angleIsInLeftEmicircle(angle)
{
  return Math.PI / 2 < angle && angle < 3 * Math.PI / 2;
}

function draw_jellyfish_node(graphicsContainer, d, status, center, text_id, json_node_map, colors)
{
  let inLeftEmicircle = angleIsInLeftEmicircle(d.angle);

//if(d.text_id === "V021") console.log("setting inLeftEmicircle(text_id : " + d.text_id + ")");
  d.inLeftEmicircle = inLeftEmicircle;

  let textDistanceFactor = 1; //1.5;
  let textDistanceFactor2 = 1.15;
  let textDistance1 = 30;
  let textDistance2 = 0;

  let textColor;

//if(d.hill_size) console.log("d.hill_size : " + d.hill_size);
//console.log("d :");
//console.log(d);
/*
  switch(d.local_type)
  {
      case "generico_terrestre"     : textColor = colors.generico_terrestre_bright;   break;
      case "generico_non_terrestre" : textColor = colors.generico_cosmico_bright;  break;
      case "nominato_terrestre"     : textColor = colors.nominato_terrestre_bright; break;
      case "nominato_non_terrestre" : textColor = colors.nominato_cosmico_bright;  break;
      case "inventato"              : textColor = colors.inventato_bright; break;
      case "no_ambientazione"       : textColor = colors.no_ambientazione_bright;  break;
  }
*/
  textColor = map_color(d.local_type, colors);

  let angle, textDistance;

  if(d.changeTextRotation)
  {
    if(inLeftEmicircle)
    {
       angle = d.angle;
       textDistance = textDistance1 + 50;
    }
    else
    {
      angle = d.angle + Math.PI;
      textDistance = textDistance2;
    }
  }
  else
  {
    if(inLeftEmicircle)
    {
      angle = d.angle + Math.PI;
      textDistance = textDistance1;
    }
    else
    {
      angle = d.angle;
      textDistance = textDistance2;
    }
  }

  let text_info = {
    text_id : d.text_id,
    node_id : d.node_id,
    angle : angle,
    textColor : textColor,
    textAnchor : inLeftEmicircle ? "end" : "start",
    tx : center.x + (d.radius + textDistance) * Math.cos(d.angle),
    ty : center.y + (d.radius + textDistance) * Math.sin(d.angle),
    caption : d.caption,
    inLeftEmicircle : inLeftEmicircle
  };

  if(d.level > 0 && d.hasPoint) draw_point(graphicsContainer, d.circle_position, textColor, text_id);

  if(d.level > 0) draw_text(graphicsContainer, text_info, text_id, json_node_map);

  if(d.children.length > 0)
  {
    let line_angle = d.angle;

    let captionLenSaturationValue = 35;

    let diagonal = d.bbox ? Math.sqrt(d.bbox.width * d.bbox.width + d.bbox.height * d.bbox.height) : 0;
    let diagonalScaleFactor = 1.4;

    let radiusProposedValue = d.bbox ?
      d.radius + diagonal * diagonalScaleFactor:
      d.radius + 20 * Math.min(text_info.caption.length, captionLenSaturationValue);

    let start_point = {
      angle : line_angle,
      radius : Math.min(
        radiusProposedValue,
        d.children[0].radius - 10)
    };

    start_point.x = center.x + start_point.radius * Math.cos(start_point.angle);
    start_point.y = center.y + start_point.radius * Math.sin(start_point.angle);

    let target_point = {
      angle : line_angle,
      radius : d.children[0].radius
    };

    target_point.x = center.x + target_point.radius * Math.cos(target_point.angle);
    target_point.y = center.y + target_point.radius * Math.sin(target_point.angle);

    draw_line(
      graphicsContainer,
      {
          point1 : start_point,
          point2 : target_point
      },
      d.color,
      text_id);

    if(+d.level === 0 || d.children.length > 1)
    {
      let arcWidth = 2;

      if(+d.level === 0)
      {
        for(let i = 0; i < d.children.length; ++i)
        {
          let startAngle = calculate_startAngle(d.children, i);
          let endAngle = calculate_endAngle(d.children, i);

          let arc = {
            center : center,
            radius : d.children[0].radius,
            width : arcWidth,
            startAngle : startAngle,
            endAngle : endAngle
          };

//          draw_arc(graphicsContainer, arc, d.children[i].color, text_id);
        }
      }
      else
      {
        let firstNodeWithPoint = d.children.find(d => d.hasPoint);

        const reverted_children = [...d.children];
        reverted_children.reverse();
        let lastNodeWithPoint = reverted_children.find(d => d.hasPoint);

        let arc = {
          center : center,
          radius : d.children[0].radius,
          width : arcWidth,
          startAngle : firstNodeWithPoint.angle + Math.PI / 2,
          endAngle : lastNodeWithPoint.angle + Math.PI / 2
        };

        draw_arc(graphicsContainer, arc, d.color, text_id);
      }
    }
  }
}

export function draw_jellyfish(graphicsContainer, jellyfish, center, text_id, json_node_map, colors)
{
  visit(
    jellyfish,
    {},
    (d, status) => draw_jellyfish_node(graphicsContainer, d, status, center, text_id, json_node_map, colors));
}

export function prepare_jellyfish_data_2(jellyfish, center, radiusScaleFactor)
{
  var level_maxTextLen_map = new Map();

  visit(
    jellyfish,
    {},
    d => {
      for(let i = 0; i < d.children.length; ++i)
      {
        if(!d.children[i].hasPoint)
        {
//console.log("i : " + d.children[i].node_id + " - " + d.children[i].caption + " - emicircle : " + (d.children[i].inLeftEmicircle ? "left" : "right") + " - radius : " + d.children[i].radius);
//console.log("i-1 : " + d.children[i - 1].node_id + " - " + d.children[i - 1].caption + " - emicircle : " + (d.children[i - 1].inLeftEmicircle ? "left" : "right") + " - radius : " + d.children[i - 1].radius);

          if(d.children[i - 1].inLeftEmicircle)
          {
            // L -> L
            if(d.children[i].inLeftEmicircle)
            {
              [d.children[i - 1], d.children[i]] = [d.children[i], d.children[i - 1]];
              [d.children[i - 1].angle, d.children[i].angle] = [d.children[i].angle, d.children[i - 1].angle];

              let deltaAngle = d.children[i - 1].angle - d.children[i].angle;
              let wantedDeltaDegrees = 2;

              // Tuning : for this precise node, this angle adjustment method is preferred
              if(d.children[i].node_id === "V021@Petkwo@Albergo_(del_Giglio_Marino)")
              {
                d.children[i].angle += deltaAngle * 0.4;
              }
              // for all the others, this technique fits better
              else
              {
                d.children[i - 1].angle = d.children[i].angle - (wantedDeltaDegrees / 360 * 2 * Math.PI); // move on the first line of the double line text
              }
            }
            // L -> R
            else
            {
              let deltaAngle = d.children[i - 1].angle - d.children[i].angle;
              let wantedDeltaDegrees = 2;

              // NOTE : this fix works if the pair (first line, second line) is the last one in the arc. if there are further nodes, they will have to be moved too
              d.children[i].angle = d.children[i - 1].angle - (wantedDeltaDegrees / 360 * 2 * Math.PI); // move on the first line of the double line text

//              d.children[i].angle += deltaAngle * 0.4;

/*
              // and now fix what is the second line of the double line text
              if(d.children[i - 1].inLeftEmicircle)
              {
//console.log("i : in right, i - 1 : in left");
                d.children[i - 1].angle = d.children[i].angle + (wantedDeltaDegrees / 360 * 2 * Math.PI);
              }
              else
              {
//console.log("i : in right, i - 1 : in right");
                d.children[i - 1].angle = d.children[i].angle + (wantedDeltaDegrees / 360 * 2 * Math.PI);
              }
*/
            }
          }
          else
          {
            // R -> L
            if(d.children[i].inLeftEmicircle)
            {
              let deltaAngle = d.children[i - 1].angle - d.children[i].angle;

              // Tuning : this should be a function of the radius
              let wantedDeltaDegrees = 5;

              // NOTE : this fix works if the pair (first line, second line) is the last one in the arc. if there are further nodes, they will have to be moved too
              d.children[i].angle = d.children[i - 1].angle + (wantedDeltaDegrees / 360 * 2 * Math.PI); // move on the first line of the double line text

              if(angleIsInLeftEmicircle(d.children[i].angle)) d.children[i].changeTextRotation = true;
            }
            // R -> R
            else
            {
              let deltaAngle = d.children[i - 1].angle - d.children[i].angle;
              let wantedDeltaDegrees = 2;

              // Tuning : for this precise node, this angle adjustment method is preferred
              if(d.children[i - 1].node_id === "V021@università@Istituto_di_lingue_e_letterature_botno-ugriche")
              {
                if(i === d.children.length - 1)
                {
                  d.children[i - 1].angle -= deltaAngle * 0.4;
                }
                else
                {
                  d.children[i].angle += deltaAngle * 0.4;
                }
              }
              // for all the others, this technique fits better
              else
              {
                if(i === d.children.length - 1)
                {
                  d.children[i - 1].angle = d.children[i].angle - (wantedDeltaDegrees / 360 * 2 * Math.PI); // move on the first line of the double line text
                }
                else
                {
                  d.children[i].angle = d.children[i - 1].angle + (wantedDeltaDegrees / 360 * 2 * Math.PI); // move back the last line of the double line text
                }
              }
            }
          }
        }
      }
    });

  visit_levels(
    jellyfish,
    level_maxTextLen_map,
    (d, level) => {
      let maxTextLen = level_maxTextLen_map.get(level) || 0;

      if(+d.level > 0)
      {
        let diagonal = Math.sqrt(d.bbox.width * d.bbox.width + d.bbox.height * d.bbox.height);
        level_maxTextLen_map.set(level, Math.max(maxTextLen, diagonal));
      }

//      level_maxTextLen_map.set(level, Math.max(maxTextLen, d.caption.length));
    });

  // set level 0 at length 0
  level_maxTextLen_map.set(0, 0);

  let bboxSizeScaleFactor = 2; //1.25;

  // force first item to the hill radius, scaled
//  level_maxTextLen_map.set(0, jellyfish.children[0].stripe_position.y * radiusScaleFactor / textLenScaleFactor);

  let level_deltaRadius_map = MapToMap(
    level_maxTextLen_map,
    d => d * bboxSizeScaleFactor);
//    d => d * textLenScaleFactor);

//   // force first item to the hill radius, scaled
  level_deltaRadius_map.set(0, jellyfish.children[0].stripe_position.y * radiusScaleFactor /* / textLenScaleFactor*/);

  let level_progressiveRadius_map = getProgressiveSumMap(level_deltaRadius_map);

//console.log(jellyfish.text_id);
//console.log(jellyfish.children[0].stripe_position.y * radiusScaleFactor);
//console.log(level_progressiveRadius_map);

  visit(
    jellyfish,
    {},
    (d, status) => {
      if(+d.level === 0)
      {
        d.circle_position.x = center.x;
        d.circle_position.y = center.y;
        d.radius = 0;
        d.angle = 0;
      }

      if(+d.level > 0)
      {
        d.angle = d.angle;
//        d.radius = d.stripe_position.y * radiusScaleFactor;
//        d.radius = level_progressiveRadius_map.get(+d.level - 1) * radiusScaleFactor / 5;
        d.radius = level_progressiveRadius_map.get(+d.level - 1);

        let x = Math.cos(d.angle) * d.radius + center.x;
        let y = Math.sin(d.angle) * d.radius + center.y;

        d.circle_position.x = x;
        d.circle_position.y = y;
      }
    });
}

function algebraicShortestAngleDifference(angle1, angle2)
{
  let a1 = normalizeAngle(angle1);
  let a2 = normalizeAngle(angle2);

  if(a2 === a1) return 0;

  if(a2 > a1)
  {
	  let delta = a2 - a1;
	  if(delta > Math.PI) return 2 * Math.PI - (delta);
	  else return delta;
  }
  else
  {
	  let delta = a1 - a2;
	  if(delta > Math.PI) return -(2 * Math.PI - (delta));
	  else return -delta;
  }
}

function calculate_startAngle(nodes, i)
{
  let startAngle =
    nodes[i].angle -
    deltaAngle(
      nodes[mod(i - 1, nodes.length)].angle,
      nodes[i].angle) / 2;

  startAngle = normalizeAngle(startAngle + Math.PI / 2);

  return startAngle;
}

function calculate_endAngle(nodes, i)
{
  let endAngle =
    nodes[i].angle +
    deltaAngle(
      nodes[i].angle,
      nodes[mod(i + 1, nodes.length)].angle) / 2;

  endAngle = normalizeAngle(endAngle + Math.PI / 2);

  return endAngle;
}

function deltaAngle(angle1, angle2)
{
  let a1 = normalizeAngle(angle1);
  let a2 = normalizeAngle(angle2);

  if(a1 > a2) return a2 + (2 * Math.PI - a1);
  else return a2 - a1;
}

function mod(x, n)
{
  return (x % n + n) % n;
}
