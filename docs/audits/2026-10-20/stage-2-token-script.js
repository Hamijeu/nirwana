/**
 * createSemanticTokens
 *
 * Creates a batch of Figma variables in the given collection, one per entry in
 * `tokenMap`. Supports raw values, variable alias references, code syntax, and
 * scopes. Returns a map of token name → Variable for use in subsequent steps.
 *
 * @param {VariableCollection} collection - The target variable collection.
 * @param {Record<string, string>} modeIds - Map of {modeName: modeId} from createVariableCollection.
 * @param {Array<{
 *   name: string,
 *   type: 'COLOR' | 'FLOAT' | 'STRING' | 'BOOLEAN' | 'TIMING' | 'EASING',
 *   values: Record<string, string | number | boolean | MotionEasing | {type: 'VARIABLE_ALIAS', id: string}>,
 *   scopes?: VariableScope[],
 *   codeSyntax?: {WEB?: string, ANDROID?: string, iOS?: string}
 * }>} tokenMap - Ordered list of token definitions.
 *   - `name`: Variable name using slash hierarchy (e.g. "color/bg/primary").
 *   - `type`: Figma variable type.
 *   - `values`: Map of {modeName: value}. Values can be raw (hex string for COLOR,
 *     number for FLOAT) or alias objects {type: 'VARIABLE_ALIAS', id: variableId}.
 *     For COLOR, raw values are accepted as hex strings ("#rrggbb" or "#rrggbbaa")
 *     and converted to {r, g, b, a} automatically.
 *   - `scopes`: Array of VariableScope strings. Omit to use [] (hidden/primitive).
 *   - `codeSyntax`: Platform code syntax strings. Omit to skip.
 * @returns {Promise<{variables: Record<string, Variable>}>}
 *   `variables` maps each token name to its created Variable object.
 */
async function createSemanticTokens(collection, modeIds, tokenMap) {
  const variables = {}

  for (const token of tokenMap) {
    // Create the variable
    const variable = figma.variables.createVariable(token.name, collection, token.type)

    // Set values for each mode
    for (const [modeName, rawValue] of Object.entries(token.values)) {
      const modeId = modeIds[modeName]
      if (!modeId) {
        throw new Error(
          `createSemanticTokens: mode "${modeName}" not found in modeIds for token "${token.name}". ` +
            `Available modes: ${Object.keys(modeIds).join(', ')}`,
        )
      }

      let value = rawValue

      // Convert hex strings to Figma RGBA for COLOR type
      if (token.type === 'COLOR' && typeof rawValue === 'string' && rawValue.startsWith('#')) {
        value = hexToFigmaColor(rawValue)
      }

      variable.setValueForMode(modeId, value)
    }

    // Set scopes (default: empty array = hidden from property pickers / primitives)
    variable.scopes = token.scopes || []

    // Set code syntax per platform
    if (token.codeSyntax) {
      if (token.codeSyntax.WEB) {
        variable.setVariableCodeSyntax('WEB', token.codeSyntax.WEB)
      }
      if (token.codeSyntax.ANDROID) {
        variable.setVariableCodeSyntax('ANDROID', token.codeSyntax.ANDROID)
      }
      if (token.codeSyntax.iOS) {
        variable.setVariableCodeSyntax('iOS', token.codeSyntax.iOS)
      }
    }

    variables[token.name] = variable
  }

  return { variables }
}

/**
 * Converts a hex color string to a Figma RGBA object.
 * Supports "#rgb", "#rrggbb", and "#rrggbbaa".
 *
 * @param {string} hex
 * @returns {{ r: number, g: number, b: number, a: number }}
 */
function hexToFigmaColor(hex) {
  let h = hex.replace('#', '')

  // Expand shorthand #rgb → #rrggbb
  if (h.length === 3) {
    h = h
      .split('')
      .map((c) => c + c)
      .join('')
  }

  const r = parseInt(h.substring(0, 2), 16) / 255
  const g = parseInt(h.substring(2, 4), 16) / 255
  const b = parseInt(h.substring(4, 6), 16) / 255
  const a = h.length === 8 ? parseInt(h.substring(6, 8), 16) / 255 : 1

  return { r, g, b, a }
}


const affected=[];const variableIds=[];const styleIds=[];
for(const style of ['Regular','Medium','Semi Bold','Bold','Extra Bold'])await figma.loadFontAsync({family:'Inter',style});
const collections=await figma.variables.getLocalVariableCollectionsAsync();
const light=collections.find(c=>c.id==='VariableCollectionId:6:15'),dark=collections.find(c=>c.id==='VariableCollectionId:340:329'),dim=collections.find(c=>c.id==='VariableCollectionId:6:25');
let primitive=collections.find(c=>c.name==='Nirwana / Primitive');if(!primitive)primitive=figma.variables.createVariableCollection('Nirwana / Primitive');
for(const [c,n]of [[light,'Light'],[dark,'Dark'],[dim,'Value'],[primitive,'Value']]){c.renameMode(c.modes[0].modeId,n);affected.push(c.id);}
const all=await figma.variables.getLocalVariablesAsync();const primByHex={};
const specs=[["Color/Action/Primary","#2563eb","#8bb4ff","--primary","Primary"],["Color/Action/Button","#2563eb","#316bd7",null,"Button"],["Color/Action/OnPrimary","#ffffff","#ffffff",null,null],["Color/Text/Primary","#17233b","#e3ebf8","--text","Text"],["Color/Text/Secondary","#718098","#a6b5cc","--muted","Muted"],["Color/Surface/Default","#ffffff","#141f32","--surface","Surface"],["Color/Background/Default","#f7f9fc","#0c1424","--bg","Background"],["Color/Border/Default","#e6ebf2","#2c3b53","--border","Border"],["Color/Status/Success","#16a34a","#70dda5","--success",null],["Color/Status/Warning","#f59e0b","#f8ca74","--warning",null],["Color/Status/Danger","#dc2626","#ff9caa","--danger",null],["Color/Status/SuccessSurface","#e8f7ee","#183e33",null,"SuccessSurface"],["Color/Status/SuccessText","#168548","#82e4b3",null,"SuccessText"],["Color/Status/WarningSurface","#fff4dc","#433721",null,"WarningSurface"],["Color/Status/WarningText","#b5750b","#f8ce82",null,"WarningText"],["Color/Status/DangerSurface","#ffe9e8","#472735",null,"DangerSurface"],["Color/Status/DangerText","#c33136","#ffabb7",null,"DangerText"],["Color/Surface/Blue","#eff4ff","#233b61",null,"BlueSurface"],["Color/Surface/Auth","#142a52","#101e36",null,"AuthSurface"],["Color/Surface/Input","#ffffff","#101b2d",null,"Input"],["Color/Surface/Navigation","#edf1f6","#141f32",null,null],["Color/Border/Navigation","#b8c6d9","#2c3b53",null,null],["Color/Action/SelectedSurface","#dce7fc","#233b61",null,null],["Color/Text/Navigation","#43536b","#a6b5cc",null,null],["Color/Action/Focus","#7da9ff","#7da9ff",null,null],["Color/Surface/Overlay","#14243c89","#030916bc",null,null],["Color/Text/Brand","#14284e","#e3edff","--navy",null]];
const hexes=[...new Set(specs.flatMap(s=>[s[1],s[2]]))];
const missing=hexes.filter(h=>!all.some(v=>v.variableCollectionId===primitive.id&&v.name==='Palette/'+h.slice(1).toUpperCase()));
const made=await createSemanticTokens(primitive,{Value:primitive.modes[0].modeId},missing.map(h=>({name:'Palette/'+h.slice(1).toUpperCase(),type:'COLOR',values:{Value:h},scopes:[],codeSyntax:{WEB:'var(--nirwana-palette-'+h.slice(1)+', '+h+')'}})));
for(const v of Object.values(made.variables)){all.push(v);variableIds.push(v.id);}
for(const h of hexes)primByHex[h]=all.find(v=>v.variableCollectionId===primitive.id&&v.name==='Palette/'+h.slice(1).toUpperCase());
const maps={Light:{},Dark:{}};
for(const [name,lh,dh,css,legacy]of specs)for(const [c,h,label]of [[light,lh,'Light'],[dark,dh,'Dark']]){
let v=all.find(v=>v.variableCollectionId===c.id&&(v.name===name||(label==='Dark'&&v.name===legacy)));
if(!v){v=figma.variables.createVariable(name,c,'COLOR');all.push(v);}v.name=name;
v.setValueForMode(c.modes[0].modeId,{type:'VARIABLE_ALIAS',id:primByHex[h].id});
v.scopes=name.includes('/Text/')||name.endsWith('Text')||name.endsWith('OnPrimary')?['TEXT_FILL']:name.includes('/Border/')?['STROKE_COLOR']:name.includes('/Action/')||name.includes('/Status/')?['FRAME_FILL','SHAPE_FILL','TEXT_FILL','STROKE_COLOR']:['FRAME_FILL','SHAPE_FILL'];
const proposed='--nirwana-'+name.replace('Color/','').replaceAll('/','-').toLowerCase();
v.setVariableCodeSyntax('WEB','var('+(css||proposed)+', '+h+')');
v.description=css?'Web source: '+css+'; theme '+label+'.':'Design semantic alias for CSS literal '+h+'; proposed fallback syntax, CSS variable not yet declared in web.';
variableIds.push(v.id);maps[label][name]={id:v.id,hex:h};
}
for(const v of all.filter(v=>v.variableCollectionId===dim.id)){v.scopes=v.name.startsWith('Spacing/')?['GAP']:['CORNER_RADIUS'];v.setVariableCodeSyntax('WEB','var(--nirwana-'+v.name.replaceAll('/','-').toLowerCase()+', '+Object.values(v.valuesByMode)[0]+'px)');v.description='Design token mapped to existing CSS literal; custom property is a proposed fallback.';variableIds.push(v.id);}
for(const radius of [9,10,14,18]){let name='Radius/'+radius;let v=all.find(v=>v.variableCollectionId===dim.id&&v.name===name);if(!v){v=figma.variables.createVariable(name,dim,'FLOAT');all.push(v);}v.scopes=['CORNER_RADIUS'];v.setValueForMode(dim.modes[0].modeId,radius);v.setVariableCodeSyntax('WEB','var(--nirwana-radius-'+radius+', '+radius+'px)');variableIds.push(v.id);}
const existingStyles=await figma.getLocalTextStylesAsync();const typography={};
for(const [suffix,size,line,weight,tracking]of [["Display/Hero",57,64,"Extra Bold",-5.5],["Display/HeroMobile",36,41,"Extra Bold",-5.5],["Heading/Page",29,34.22,"Extra Bold",-4.5],["Heading/PageMobile",25,29.5,"Extra Bold",-4.5],["Heading/Auth",27,33,"Bold",-4],["Heading/Section",27,32.4,"Bold",-4],["Heading/Panel",15,20,"Extra Bold",-2],["Heading/Card",18,24,"Bold",-2.5],["Body/Lead",14,24.5,"Regular",0],["Body/Default",13,21.45,"Regular",0],["Body/Compact",12,19.8,"Regular",0],["Label/Field",12,16,"Bold",0],["Label/Button",13,18,"Bold",0],["Label/Navigation",12,17,"Semi Bold",0],["Caption/Default",10,16,"Regular",0],["Caption/Small",9,14,"Bold",5],["Label/Eyebrow",10,14,"Extra Bold",14],["Data/Metric",26,32,"Extra Bold",-5]]){const name='Nirwana/'+suffix;let s=existingStyles.find(s=>s.name===name);if(!s)s=figma.createTextStyle();s.name=name;s.fontName={family:'Inter',style:weight};s.fontSize=size;s.lineHeight={unit:'PIXELS',value:line};s.letterSpacing={unit:'PERCENT',value:tracking};s.description='Web parity baseline 4118faa, '+size+'px / '+line+'px. Do not silently enlarge caption during parity work.';styleIds.push(s.id);typography[suffix]=s.id;}
const effectDefs=[['Nirwana/Elevation/Panel','#1c335605',0,2,8],['Nirwana/Elevation/Header','#243e6010',0,2,5],['Nirwana/Elevation/Modal','#0c1e3b50',0,20,70],['Nirwana/Focus/Light','#2563eb17',0,0,0],['Nirwana/Focus/Dark','#8bb4ff30',0,0,0]];
const effects=await figma.getLocalEffectStylesAsync();const effectMap={};
for(const [name,hex,x,y,blur]of effectDefs){let s=effects.find(e=>e.name===name)||figma.createEffectStyle();s.name=name;s.effects=[{type:'DROP_SHADOW',color:hexToFigmaColor(hex),offset:{x,y},radius:blur,spread:name.includes('Focus')?3:0,visible:true,blendMode:'NORMAL'}];styleIds.push(s.id);effectMap[name]=s.id;}
return {affectedCollectionIds:affected,affectedVariableIds:variableIds,affectedStyleIds:styleIds,maps,typography,effectMap,counts:{semanticPerTheme:specs.length,primitives:hexes.length,textStyles:18,effectStyles:5},scope:'Stage 2 foundations only'};

