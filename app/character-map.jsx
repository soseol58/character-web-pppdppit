import { useState, useRef, useCallback, useEffect } from "react";

const BG_THEMES = [
  { id: "dark", label: "검정", bg: ["#0F0F1A","#1A1A2E","#16213E"], grid: "rgba(255,255,255,0.05)", text: "#F0F0F0", textSec: "#888", textMut: "#666", card: ["#1E1E2E","#2A2A3E"], panel: ["rgba(30,30,46,0.95)","rgba(42,42,62,0.95)"], input: "rgba(255,255,255,0.06)", inputBd: "rgba(255,255,255,0.1)", btnSec: "rgba(255,255,255,0.06)", btnSecBd: "rgba(255,255,255,0.1)", btnSecC: "#999", label: "rgba(15,15,26,0.85)", labelBd: "rgba(255,255,255,0.08)", labelTxt: "#E0E0E0", pill: "rgba(15,15,26,0.85)", nodeStr: "rgba(255,255,255,0.15)", selStr: "#fff", help: "rgba(30,30,46,0.7)", helpBd: "rgba(255,255,255,0.05)", overlay: "rgba(15,15,20,0.7)", cardBd: "rgba(255,255,255,0.08)", shadow: "0 25px 60px rgba(0,0,0,0.5)", pShadow: "0 15px 40px rgba(0,0,0,0.3)", wm: "rgba(255,255,255,0.08)", swatch: "#1A1A2E" },
  { id: "light", label: "흰색", bg: ["#F0F2F5","#E8ECF1","#DFE5ED"], grid: "rgba(0,0,0,0.04)", text: "#1A1A2E", textSec: "#666", textMut: "#999", card: ["#FFFFFF","#F5F7FA"], panel: ["rgba(255,255,255,0.97)","rgba(245,247,250,0.97)"], input: "rgba(0,0,0,0.04)", inputBd: "rgba(0,0,0,0.12)", btnSec: "rgba(0,0,0,0.04)", btnSecBd: "rgba(0,0,0,0.12)", btnSecC: "#555", label: "rgba(255,255,255,0.92)", labelBd: "rgba(0,0,0,0.08)", labelTxt: "#333", pill: "rgba(255,255,255,0.92)", nodeStr: "rgba(0,0,0,0.1)", selStr: "#1A1A2E", help: "rgba(255,255,255,0.8)", helpBd: "rgba(0,0,0,0.06)", overlay: "rgba(255,255,255,0.6)", cardBd: "rgba(0,0,0,0.08)", shadow: "0 25px 60px rgba(0,0,0,0.12)", pShadow: "0 15px 40px rgba(0,0,0,0.08)", wm: "rgba(0,0,0,0.1)", swatch: "#E8ECF1" },
  { id: "gray", label: "회색", bg: ["#E5E7EB","#D1D5DB","#C9CDD3"], grid: "rgba(0,0,0,0.04)", text: "#1F2937", textSec: "#6B7280", textMut: "#9CA3AF", card: ["#F9FAFB","#F3F4F6"], panel: ["rgba(249,250,251,0.97)","rgba(243,244,246,0.97)"], input: "rgba(0,0,0,0.05)", inputBd: "rgba(0,0,0,0.12)", btnSec: "rgba(0,0,0,0.05)", btnSecBd: "rgba(0,0,0,0.12)", btnSecC: "#6B7280", label: "rgba(249,250,251,0.92)", labelBd: "rgba(0,0,0,0.08)", labelTxt: "#374151", pill: "rgba(249,250,251,0.92)", nodeStr: "rgba(0,0,0,0.1)", selStr: "#1F2937", help: "rgba(249,250,251,0.8)", helpBd: "rgba(0,0,0,0.06)", overlay: "rgba(243,244,246,0.6)", cardBd: "rgba(0,0,0,0.08)", shadow: "0 25px 60px rgba(0,0,0,0.1)", pShadow: "0 15px 40px rgba(0,0,0,0.06)", wm: "rgba(0,0,0,0.08)", swatch: "#D1D5DB" },
  { id: "beige", label: "갈색", bg: ["#F5F0E8","#EBE3D5","#DED5C4"], grid: "rgba(0,0,0,0.03)", text: "#3E2F1C", textSec: "#7C6A52", textMut: "#A89880", card: ["#FBF8F3","#F5F0E8"], panel: ["rgba(251,248,243,0.97)","rgba(245,240,232,0.97)"], input: "rgba(0,0,0,0.04)", inputBd: "rgba(0,0,0,0.1)", btnSec: "rgba(0,0,0,0.04)", btnSecBd: "rgba(0,0,0,0.1)", btnSecC: "#7C6A52", label: "rgba(251,248,243,0.92)", labelBd: "rgba(0,0,0,0.07)", labelTxt: "#3E2F1C", pill: "rgba(251,248,243,0.92)", nodeStr: "rgba(0,0,0,0.08)", selStr: "#3E2F1C", help: "rgba(251,248,243,0.8)", helpBd: "rgba(0,0,0,0.05)", overlay: "rgba(245,240,232,0.6)", cardBd: "rgba(0,0,0,0.07)", shadow: "0 25px 60px rgba(0,0,0,0.08)", pShadow: "0 15px 40px rgba(0,0,0,0.05)", wm: "rgba(0,0,0,0.08)", swatch: "#EBE3D5" },
  { id: "pink", label: "분홍색", bg: ["#FDE8EF","#F9D0DF","#F2B8CE"], grid: "rgba(0,0,0,0.03)", text: "#4A1A2E", textSec: "#9B5070", textMut: "#C48BA0", card: ["#FFF5F8","#FDE8EF"], panel: ["rgba(255,245,248,0.97)","rgba(253,232,239,0.97)"], input: "rgba(0,0,0,0.04)", inputBd: "rgba(0,0,0,0.1)", btnSec: "rgba(0,0,0,0.04)", btnSecBd: "rgba(0,0,0,0.1)", btnSecC: "#9B5070", label: "rgba(255,245,248,0.92)", labelBd: "rgba(0,0,0,0.07)", labelTxt: "#4A1A2E", pill: "rgba(255,245,248,0.92)", nodeStr: "rgba(0,0,0,0.08)", selStr: "#4A1A2E", help: "rgba(255,245,248,0.8)", helpBd: "rgba(0,0,0,0.05)", overlay: "rgba(253,232,239,0.6)", cardBd: "rgba(0,0,0,0.07)", shadow: "0 25px 60px rgba(0,0,0,0.08)", pShadow: "0 15px 40px rgba(0,0,0,0.05)", wm: "rgba(0,0,0,0.08)", swatch: "#F9D0DF" },
  { id: "purple", label: "보라색", bg: ["#EDE5F5","#DDD0EE","#CCBBE6"], grid: "rgba(0,0,0,0.03)", text: "#2E1A4A", textSec: "#6B4D8A", textMut: "#9B85B5", card: ["#F8F5FC","#EDE5F5"], panel: ["rgba(248,245,252,0.97)","rgba(237,229,245,0.97)"], input: "rgba(0,0,0,0.04)", inputBd: "rgba(0,0,0,0.1)", btnSec: "rgba(0,0,0,0.04)", btnSecBd: "rgba(0,0,0,0.1)", btnSecC: "#6B4D8A", label: "rgba(248,245,252,0.92)", labelBd: "rgba(0,0,0,0.07)", labelTxt: "#2E1A4A", pill: "rgba(248,245,252,0.92)", nodeStr: "rgba(0,0,0,0.08)", selStr: "#2E1A4A", help: "rgba(248,245,252,0.8)", helpBd: "rgba(0,0,0,0.05)", overlay: "rgba(237,229,245,0.6)", cardBd: "rgba(0,0,0,0.07)", shadow: "0 25px 60px rgba(0,0,0,0.08)", pShadow: "0 15px 40px rgba(0,0,0,0.05)", wm: "rgba(0,0,0,0.08)", swatch: "#DDD0EE" },
  { id: "blue", label: "파란색", bg: ["#E0ECFA","#C8DAFA","#B0C8F0"], grid: "rgba(0,0,0,0.03)", text: "#1A2E4A", textSec: "#4D6D8A", textMut: "#85A0B5", card: ["#F0F5FC","#E0ECFA"], panel: ["rgba(240,245,252,0.97)","rgba(224,236,250,0.97)"], input: "rgba(0,0,0,0.04)", inputBd: "rgba(0,0,0,0.1)", btnSec: "rgba(0,0,0,0.04)", btnSecBd: "rgba(0,0,0,0.1)", btnSecC: "#4D6D8A", label: "rgba(240,245,252,0.92)", labelBd: "rgba(0,0,0,0.07)", labelTxt: "#1A2E4A", pill: "rgba(240,245,252,0.92)", nodeStr: "rgba(0,0,0,0.08)", selStr: "#1A2E4A", help: "rgba(240,245,252,0.8)", helpBd: "rgba(0,0,0,0.05)", overlay: "rgba(224,236,250,0.6)", cardBd: "rgba(0,0,0,0.07)", shadow: "0 25px 60px rgba(0,0,0,0.08)", pShadow: "0 15px 40px rgba(0,0,0,0.05)", wm: "rgba(0,0,0,0.08)", swatch: "#C8DAFA" },
  { id: "green", label: "초록색", bg: ["#E0F5E8","#C2EBCE","#A8DEB8"], grid: "rgba(0,0,0,0.03)", text: "#1A3E2A", textSec: "#4D7A5E", textMut: "#85B098", card: ["#F0FBF4","#E0F5E8"], panel: ["rgba(240,251,244,0.97)","rgba(224,245,232,0.97)"], input: "rgba(0,0,0,0.04)", inputBd: "rgba(0,0,0,0.1)", btnSec: "rgba(0,0,0,0.04)", btnSecBd: "rgba(0,0,0,0.1)", btnSecC: "#4D7A5E", label: "rgba(240,251,244,0.92)", labelBd: "rgba(0,0,0,0.07)", labelTxt: "#1A3E2A", pill: "rgba(240,251,244,0.92)", nodeStr: "rgba(0,0,0,0.08)", selStr: "#1A3E2A", help: "rgba(240,251,244,0.8)", helpBd: "rgba(0,0,0,0.05)", overlay: "rgba(224,245,232,0.6)", cardBd: "rgba(0,0,0,0.07)", shadow: "0 25px 60px rgba(0,0,0,0.08)", pShadow: "0 15px 40px rgba(0,0,0,0.05)", wm: "rgba(0,0,0,0.08)", swatch: "#C2EBCE" },
  { id: "transparent", label: "투명", bg: ["transparent","transparent","transparent"], grid: "rgba(0,0,0,0.06)", text: "#333", textSec: "#666", textMut: "#999", card: ["#FFFFFF","#F5F7FA"], panel: ["rgba(255,255,255,0.97)","rgba(245,247,250,0.97)"], input: "rgba(0,0,0,0.04)", inputBd: "rgba(0,0,0,0.12)", btnSec: "rgba(0,0,0,0.04)", btnSecBd: "rgba(0,0,0,0.12)", btnSecC: "#555", label: "rgba(255,255,255,0.92)", labelBd: "rgba(0,0,0,0.08)", labelTxt: "#333", pill: "rgba(255,255,255,0.92)", nodeStr: "rgba(0,0,0,0.1)", selStr: "#333", help: "rgba(255,255,255,0.8)", helpBd: "rgba(0,0,0,0.06)", overlay: "rgba(255,255,255,0.6)", cardBd: "rgba(0,0,0,0.08)", shadow: "0 25px 60px rgba(0,0,0,0.12)", pShadow: "0 15px 40px rgba(0,0,0,0.08)", wm: "rgba(0,0,0,0.1)", swatch: "transparent" },
];

const RELATIONSHIP_TYPES = { family:{label:"가족",color:"#E68200"}, lover:{label:"연인",color:"#F314CF"}, friend:{label:"친구",color:"#2DB78B"}, rival:{label:"라이벌",color:"#734AB2"}, enemy:{label:"적",color:"#EF4444"}, mentor:{label:"스승/제자",color:"#1359BE"}, colleague:{label:"동료",color:"#00BDE4"}, custom:{label:"기타",color:"#AAAAAA"} };
const REL_COLORS_BASE = ["#AAAAAA","#EF4444","#F1571B","#E68200","#F8E57D","#88D54E","#1E8701","#2DB78B","#00BDE4","#1359BE","#333175","#734AB2","#B575E9","#F314CF","#EB7292","#8F5438","#628059","#55777D"];
const LINE_STYLES = { solid:{label:"실선"}, dashed:{label:"점선"}, arrowToFirst:{label:"→ 첫번째"}, arrowToSecond:{label:"→ 두번째"}, arrowBoth:{label:"↔ 양방향"}, wavy:{label:"구불구불"}, zigzag:{label:"지그재그"} };
const SIZE_LEVELS = [{radius:24,fontSize:14,labelWidth:70,labelFontSize:10},{radius:32,fontSize:18,labelWidth:85,labelFontSize:11},{radius:40,fontSize:22,labelWidth:100,labelFontSize:12},{radius:52,fontSize:28,labelWidth:115,labelFontSize:13},{radius:66,fontSize:34,labelWidth:135,labelFontSize:14}];
const COLORS = ["#EF4444","#F1571B","#E68200","#F8E57D","#88D54E","#1E8701","#2DB78B","#00BDE4","#1359BE","#333175","#734AB2","#B575E9","#F314CF","#EB7292","#8F5438","#628059","#55777D"];
const generateId = () => Math.random().toString(36).substr(2, 9);

const getWavyPathD=(fX,fY,tX,tY)=>{const dx=tX-fX,dy=tY-fY,dist=Math.sqrt(dx*dx+dy*dy),w=Math.max(6,Math.round(dist/22)),a=10;let d=`M ${fX} ${fY}`;for(let i=1;i<=w;i++){const t=i/w,p=(i-0.5)/w,mx=fX+dx*p,my=fY+dy*p,ex=fX+dx*t,ey=fY+dy*t,nx=-dy/dist,ny=dx/dist,s=i%2===0?1:-1;d+=` Q ${mx+nx*a*s} ${my+ny*a*s} ${ex} ${ey}`;}return d;};
const getZigzagPathD=(fX,fY,tX,tY)=>{const dx=tX-fX,dy=tY-fY,dist=Math.sqrt(dx*dx+dy*dy),segs=Math.max(6,Math.round(dist/20)),a=10;const nx=-dy/dist,ny=dx/dist;let d=`M ${fX} ${fY}`;for(let i=1;i<=segs;i++){const t=i/segs,s=i%2===0?1:-1,px=fX+dx*t,py=fY+dy*t;if(i<segs)d+=` L ${px+nx*a*s} ${py+ny*a*s}`;else d+=` L ${px} ${py}`;}return d;};
const getCurvedPathD=(fX,fY,tX,tY)=>{const dx=tX-fX,dy=tY-fY;return`M ${fX} ${fY} Q ${(fX+tX)/2-dy*0.15} ${(fY+tY)/2+dx*0.15} ${tX} ${tY}`;};
const getMidOfCurve=(fX,fY,tX,tY)=>{const dx=tX-fX,dy=tY-fY;return{x:(fX+tX)/2-dy*0.075,y:(fY+tY)/2+dx*0.075};};

const DEFAULT_CHARACTERS = [{id:"1",name:"주인공",x:400,y:300,color:"#1359BE",avatar:null,description:"이야기의 중심 인물",sizeLevel:2},{id:"2",name:"연인",x:650,y:250,color:"#E68200",avatar:null,description:"주인공의 동반자",sizeLevel:2},{id:"3",name:"악역",x:400,y:550,color:"#EF4444",avatar:null,description:"이야기의 갈등 요소",sizeLevel:2}];
const DEFAULT_RELATIONS = [{id:"r1",from:"1",to:"2",type:"lover",label:"",customColor:null,lineStyle:"solid"},{id:"r2",from:"1",to:"3",type:"enemy",label:"",customColor:null,lineStyle:"solid"}];

export default function CharacterMap() {
  const [themeId,setThemeId]=useState("dark");const T=BG_THEMES.find(t=>t.id===themeId)||BG_THEMES[0];const isDark=themeId==="dark";
  const REL_COLORS=["BW",...REL_COLORS_BASE];
  const BW_COLOR = isDark ? "#FFFFFF" : "#222222";
  const adjustForBg=(hex)=>{if(isDark||!hex||hex==="BW")return hex;const r=parseInt(hex.slice(1,3),16),g=parseInt(hex.slice(3,5),16),b=parseInt(hex.slice(5,7),16);const lum=(0.299*r+0.587*g+0.114*b)/255;if(lum<0.55)return hex;const f=0.45/lum;return `#${Math.round(r*f).toString(16).padStart(2,"0")}${Math.round(g*f).toString(16).padStart(2,"0")}${Math.round(b*f).toString(16).padStart(2,"0")}`;};
  const resolveColor = c => {const v = c === "BW" ? BW_COLOR : c; return adjustForBg(v);};
  const [characters,setCharacters]=useState(DEFAULT_CHARACTERS);const [relations,setRelations]=useState(DEFAULT_RELATIONS);
  const [groups,setGroups]=useState([]);const [showGroupModal,setShowGroupModal]=useState(null);const [groupName,setGroupName]=useState("");const [groupColor,setGroupColor]=useState(COLORS[4]);const [groupMembers,setGroupMembers]=useState([]);
    const [dragging,setDragging]=useState(null);const [dragOffset,setDragOffset]=useState({x:0,y:0});
  const [selectedChar,setSelectedChar]=useState(null);const [connectingFrom,setConnectingFrom]=useState(null);
  const [showAddModal,setShowAddModal]=useState(false);const [showRelModal,setShowRelModal]=useState(null);const [showEditModal,setShowEditModal]=useState(null);
  const [showThemePanel,setShowThemePanel]=useState(false);const [showFab,setShowFab]=useState(false);
  const [confirmModal,setConfirmModal]=useState(null);
  const [showInfo,setShowInfo]=useState(false); // {message, onConfirm}
  const [zoom,setZoom]=useState(1);const [pan,setPan]=useState({x:0,y:0});const [isPanning,setIsPanning]=useState(false);const [panStart,setPanStart]=useState({x:0,y:0});
  const [isExporting,setIsExporting]=useState(false);
  const [projectTitle,setProjectTitle]=useState("");const [projectLogo,setProjectLogo]=useState(null);
  const [showTitleModal,setShowTitleModal]=useState(false);const [tempTitle,setTempTitle]=useState("");const [tempLogo,setTempLogo]=useState(null);
  const svgRef=useRef(null);const fileInputRef=useRef(null);const editFileInputRef=useRef(null);const logoInputRef=useRef(null);const jsonInputRef=useRef(null);
  const [canvasSize]=useState({width:2000,height:1500});

  // JSON Export/Import (zero traffic - pure client-side)
  const exportJson=()=>{const data={projectTitle,projectLogo,themeId,characters,relations,groups};const blob=new Blob([JSON.stringify(data,null,2)],{type:"application/json"});const a=document.createElement("a");a.href=URL.createObjectURL(blob);a.download=`${projectTitle||"character-map"}-${new Date().toISOString().slice(0,10)}.json`;document.body.appendChild(a);a.click();document.body.removeChild(a);URL.revokeObjectURL(a.href);};
  const importJson=(file)=>{if(!file)return;const reader=new FileReader();reader.onload=e=>{try{const data=JSON.parse(e.target.result);if(data.characters)setCharacters(data.characters);if(data.relations)setRelations(data.relations);if(data.groups)setGroups(data.groups);if(data.projectTitle!==undefined)setProjectTitle(data.projectTitle);if(data.projectLogo!==undefined)setProjectLogo(data.projectLogo);if(data.themeId)setThemeId(data.themeId);setSelectedChar(null);}catch(err){alert("파일을 읽을 수 없습니다.");}};reader.readAsText(file);};
  const [newName,setNewName]=useState("");const [newDesc,setNewDesc]=useState("");const [newColor,setNewColor]=useState(COLORS[0]);const [newAvatar,setNewAvatar]=useState(null);const [newSize,setNewSize]=useState(2);
  const [editName,setEditName]=useState("");const [editDesc,setEditDesc]=useState("");const [editColor,setEditColor]=useState("");const [editAvatar,setEditAvatar]=useState(null);const [editSize,setEditSize]=useState(2);
  const [relType,setRelType]=useState("friend");const [relLabel,setRelLabel]=useState("");const [relCustomColor,setRelCustomColor]=useState(null);const [relLineStyle,setRelLineStyle]=useState("solid");

  const getSvgPoint=useCallback((cx,cy)=>{const s=svgRef.current;if(!s)return{x:0,y:0};const r=s.getBoundingClientRect();return{x:(cx-r.left-pan.x)/zoom,y:(cy-r.top-pan.y)/zoom};},[zoom,pan]);
  const handleImageUpload=(f,cb)=>{if(!f||!f.type.startsWith("image/"))return;if(f.size>5*1024*1024){alert("5MB 이하로 선택해주세요.");return;}const r=new FileReader();r.onload=e=>cb(e.target.result);r.readAsDataURL(f);};
  const getRelColor=r=>resolveColor(r.customColor||(RELATIONSHIP_TYPES[r.type]||RELATIONSHIP_TYPES.custom).color);
  const getRelPathD=(r,f,t)=>{const ls=r.lineStyle||"solid";if(ls==="wavy")return getWavyPathD(f.x,f.y,t.x,t.y);if(ls==="zigzag")return getZigzagPathD(f.x,f.y,t.x,t.y);return getCurvedPathD(f.x,f.y,t.x,t.y);};
  const getRelMid=(r,f,t)=>{const ls=r.lineStyle||"solid";if(ls==="wavy"||ls==="zigzag")return{x:(f.x+t.x)/2,y:(f.y+t.y)/2};return getMidOfCurve(f.x,f.y,t.x,t.y);};

  const getArrowPoints=(fc,tc,targetIsTo)=>{
    const tgt=targetIsTo?tc:fc;const s=SIZE_LEVELS[tgt.sizeLevel??2];
    const dx=tc.x-fc.x,dy=tc.y-fc.y;
    const qx=(fc.x+tc.x)/2-dy*0.15,qy=(fc.y+tc.y)/2+dx*0.15;
    // Sample two points near the endpoint on the bezier to get precise tangent
    const t1=targetIsTo?0.935:0.065,t0=targetIsTo?0.89:0.11;
    const bx=(t)=>(1-t)*(1-t)*fc.x+2*(1-t)*t*qx+t*t*tc.x;
    const by=(t)=>(1-t)*(1-t)*fc.y+2*(1-t)*t*qy+t*t*tc.y;
    const tx=bx(t1)-bx(t0),ty=by(t1)-by(t0);
    const d=Math.sqrt(tx*tx+ty*ty);if(d===0)return null;
    const nx=tx/d,ny=ty/d;
    const tipX=tgt.x-nx*(s.radius+1),tipY=tgt.y-ny*(s.radius+1);
    const baseX=tipX-nx*14,baseY=tipY-ny*14;
    const px=-ny,py=nx;
    return{tipX,tipY,p1x:baseX+px*6,p1y:baseY+py*6,p2x:baseX-px*6,p2y:baseY-py*6};
  };

  // Group helpers - smooth padded hull around members
  const getGroupHull=(g)=>{
    const pts=g.members.map(mid=>characters.find(c=>c.id===mid)).filter(Boolean);
    if(pts.length===0)return null;
    const pad=30;
    // 1 member: circle
    if(pts.length===1){const c=pts[0],s=SIZE_LEVELS[c.sizeLevel??2],r=s.radius+pad;
      return{path:`M ${c.x} ${c.y-r} A ${r} ${r} 0 1 1 ${c.x-0.01} ${c.y-r} Z`,
        labelX:c.x-r+10,labelY:c.y-r-16};}
    // Sample boundary points around each member
    const boundary=[];
    pts.forEach(c=>{const s=SIZE_LEVELS[c.sizeLevel??2];const r=s.radius+pad;
      for(let i=0;i<32;i++){const a=i/32*Math.PI*2;boundary.push({x:c.x+Math.cos(a)*r,y:c.y+Math.sin(a)*r});}});
    // Graham scan
    const anchor=boundary.reduce((a,b)=>b.y<a.y||(b.y===a.y&&b.x<a.x)?b:a);
    const sorted=[...boundary].filter(p=>p!==anchor).sort((a,b)=>{
      const da=Math.atan2(a.y-anchor.y,a.x-anchor.x),db=Math.atan2(b.y-anchor.y,b.x-anchor.x);
      return da-db||Math.hypot(a.x-anchor.x,a.y-anchor.y)-Math.hypot(b.x-anchor.x,b.y-anchor.y);});
    const hull=[anchor];
    for(const p of sorted){
      while(hull.length>1){const a=hull[hull.length-2],b=hull[hull.length-1];
        if((b.x-a.x)*(p.y-a.y)-(b.y-a.y)*(p.x-a.x)<=0)hull.pop();else break;}
      hull.push(p);}
    if(hull.length<3)return null;
    // Resample hull to ~36 evenly spaced points for uniform smoothness
    let totalLen=0;const segs=[];
    for(let i=0;i<hull.length;i++){const a=hull[i],b=hull[(i+1)%hull.length];const dx=b.x-a.x,dy=b.y-a.y;const l=Math.sqrt(dx*dx+dy*dy);segs.push(l);totalLen+=l;}
    const targetPts=36;const step=totalLen/targetPts;const resampled=[];
    let segIdx=0,segOff=0;
    for(let i=0;i<targetPts;i++){
      const dist=i*step;let d=dist,si=0;
      for(si=0;si<segs.length;si++){if(d<=segs[si])break;d-=segs[si];}
      if(si>=segs.length)si=segs.length-1;
      const t=segs[si]>0?d/segs[si]:0;const a=hull[si],b=hull[(si+1)%hull.length];
      resampled.push({x:a.x+(b.x-a.x)*t,y:a.y+(b.y-a.y)*t});}
    // Cubic bezier through resampled points
    const n=resampled.length;const sm=0.18;
    let pathD=`M ${resampled[0].x} ${resampled[0].y}`;
    for(let i=0;i<n;i++){
      const p0=resampled[(i-1+n)%n],p1=resampled[i],p2=resampled[(i+1)%n],p3=resampled[(i+2)%n];
      pathD+=` C ${p1.x+(p2.x-p0.x)*sm} ${p1.y+(p2.y-p0.y)*sm} ${p2.x-(p3.x-p1.x)*sm} ${p2.y-(p3.y-p1.y)*sm} ${p2.x} ${p2.y}`;}
    pathD+=" Z";
    let minX=Infinity,minY=Infinity;resampled.forEach(p=>{minX=Math.min(minX,p.x);minY=Math.min(minY,p.y);});
    return{path:pathD,hull:resampled,labelX:minX+10,labelY:minY-16};
  };
  const openEditGroup=(g)=>{setGroupName(g.name);setGroupColor(g.color);setGroupMembers([...g.members]);setShowGroupModal(g.id);};

  // PNG Export
  const exportToPng=useCallback(async()=>{
    setIsExporting(true);setSelectedChar(null);await new Promise(r=>setTimeout(r,100));
    try{
      let minX=Infinity,minY=Infinity,maxX=-Infinity,maxY=-Infinity;
      characters.forEach(c=>{const s=SIZE_LEVELS[c.sizeLevel??2];minX=Math.min(minX,c.x-s.radius-40);minY=Math.min(minY,c.y-s.radius-20);maxX=Math.max(maxX,c.x+s.radius+40);maxY=Math.max(maxY,c.y+s.radius+50);});
      const pad=35;minX-=pad;minY-=pad;maxX+=pad;maxY+=pad;
      const hasTitle=projectTitle||projectLogo;if(hasTitle)minY-=80;
      const width=maxX-minX,height=maxY-minY,sc=2;
      const canvas=document.createElement("canvas");canvas.width=width*sc;canvas.height=height*sc;
      const ctx=canvas.getContext("2d");ctx.scale(sc,sc);ctx.translate(-minX,-minY);
      if(!isTransparent){const bgGrad=ctx.createLinearGradient(minX,minY,maxX,maxY);bgGrad.addColorStop(0,T.bg[0]);bgGrad.addColorStop(0.5,T.bg[1]);bgGrad.addColorStop(1,T.bg[2]);ctx.fillStyle=bgGrad;ctx.fillRect(minX,minY,width,height);}
      if(!isTransparent){ctx.fillStyle=T.grid;for(let gx=Math.floor(minX/40)*40;gx<maxX;gx+=40)for(let gy=Math.floor(minY/40)*40;gy<maxY;gy+=40){ctx.beginPath();ctx.arc(gx+20,gy+20,0.8,0,Math.PI*2);ctx.fill();}}

      // Title
      if(hasTitle){const cx=(minX+maxX)/2,ty=minY+65;
        if(projectLogo){await new Promise(resolve=>{const li=new Image();li.crossOrigin="anonymous";li.onload=()=>{const lh=96,lw=(li.naturalWidth/li.naturalHeight)*lh;ctx.save();ctx.font="900 36px 'Noto Sans KR',sans-serif";const tw=projectTitle?ctx.measureText(projectTitle).width:0;const totalW=lw+(projectTitle?8+tw:0);const sx=cx-totalW/2;ctx.drawImage(li,sx,ty-lh/2,lw,lh);if(projectTitle){ctx.fillStyle=T.labelTxt;ctx.textAlign="left";ctx.textBaseline="middle";ctx.fillText(projectTitle,sx+lw+8,ty);}ctx.restore();resolve();};li.onerror=()=>{if(projectTitle){ctx.save();ctx.fillStyle=T.labelTxt;ctx.font="900 36px 'Noto Sans KR',sans-serif";ctx.textAlign="center";ctx.textBaseline="middle";ctx.fillText(projectTitle,cx,ty);ctx.restore();}resolve();};li.src=projectLogo;});}
        else if(projectTitle){ctx.save();ctx.fillStyle=T.labelTxt;ctx.font="900 36px 'Noto Sans KR',sans-serif";ctx.textAlign="center";ctx.textBaseline="middle";ctx.fillText(projectTitle,cx,ty);ctx.restore();}}

      // Groups (convex hull)
      groups.forEach(g=>{const gh=getGroupHull(g);if(!gh||!gh.hull)return;
        const drawHull=(x)=>{const h=gh.hull,n=h.length,sm=0.25;x.moveTo(h[0].x,h[0].y);
          for(let i=0;i<n;i++){const p0=h[(i-1+n)%n],p1=h[i],p2=h[(i+1)%n],p3=h[(i+2)%n];
            x.bezierCurveTo(p1.x+(p2.x-p0.x)*sm,p1.y+(p2.y-p0.y)*sm,p2.x-(p3.x-p1.x)*sm,p2.y-(p3.y-p1.y)*sm,p2.x,p2.y);}x.closePath();};
        ctx.save();ctx.globalAlpha=0.1;ctx.fillStyle=g.color;ctx.beginPath();drawHull(ctx);ctx.fill();ctx.restore();
        ctx.save();ctx.globalAlpha=0.3;ctx.strokeStyle=g.color;ctx.lineWidth=2;ctx.setLineDash([8,5]);ctx.beginPath();drawHull(ctx);ctx.stroke();ctx.setLineDash([]);ctx.restore();
        if(g.name){ctx.save();ctx.globalAlpha=0.75;ctx.fillStyle=g.color;ctx.font="700 12px 'Noto Sans KR',sans-serif";ctx.textAlign="left";ctx.textBaseline="top";ctx.fillText(g.name,gh.labelX,gh.labelY);ctx.restore();}});
      // For single-member groups (arc path, no hull array)
      groups.forEach(g=>{const gh=getGroupHull(g);if(!gh||gh.hull)return;
        const p=new Path2D(gh.path);
        ctx.save();ctx.globalAlpha=0.1;ctx.fillStyle=g.color;ctx.fill(p);ctx.restore();
        ctx.save();ctx.globalAlpha=0.3;ctx.strokeStyle=g.color;ctx.lineWidth=2;ctx.setLineDash([8,5]);ctx.stroke(p);ctx.setLineDash([]);ctx.restore();
        if(g.name){ctx.save();ctx.globalAlpha=0.75;ctx.fillStyle=g.color;ctx.font="700 12px 'Noto Sans KR',sans-serif";ctx.textAlign="left";ctx.textBaseline="top";ctx.fillText(g.name,gh.labelX,gh.labelY);ctx.restore();}});

      // Relations
      relations.forEach(rel=>{const fc=characters.find(c=>c.id===rel.from),tc=characters.find(c=>c.id===rel.to);if(!fc||!tc)return;const color=getRelColor(rel),ls=rel.lineStyle||"solid";
        const drawPath=x=>{const dx=tc.x-fc.x,dy=tc.y-fc.y,dist=Math.sqrt(dx*dx+dy*dy);if(ls==="wavy"){const w=Math.max(6,Math.round(dist/22)),a=10;x.moveTo(fc.x,fc.y);for(let i=1;i<=w;i++){const t=i/w,p=(i-0.5)/w,mx=fc.x+dx*p,my=fc.y+dy*p,ex=fc.x+dx*t,ey=fc.y+dy*t,nx=-dy/dist,ny=dx/dist;x.quadraticCurveTo(mx+nx*a*(i%2===0?1:-1),my+ny*a*(i%2===0?1:-1),ex,ey);}}else if(ls==="zigzag"){const segs=Math.max(6,Math.round(dist/20)),a=10,nx=-dy/dist,ny=dx/dist;x.moveTo(fc.x,fc.y);for(let i=1;i<=segs;i++){const t=i/segs,s=i%2===0?1:-1,px=fc.x+dx*t,py=fc.y+dy*t;if(i<segs)x.lineTo(px+nx*a*s,py+ny*a*s);else x.lineTo(px,py);}}else{x.moveTo(fc.x,fc.y);x.quadraticCurveTo((fc.x+tc.x)/2-dy*0.15,(fc.y+tc.y)/2+dx*0.15,tc.x,tc.y);}};
        ctx.save();ctx.globalAlpha=isDark?0.11:0.11;ctx.strokeStyle=color;ctx.lineWidth=6;ctx.beginPath();drawPath(ctx);ctx.stroke();ctx.restore();
        ctx.save();ctx.globalAlpha=isDark?0.53:0.63;ctx.strokeStyle=color;ctx.lineWidth=2.5;if(ls==="dashed")ctx.setLineDash([8,4]);
        ctx.beginPath();drawPath(ctx);ctx.stroke();ctx.setLineDash([]);ctx.restore();
        const isArrow=ls==="arrowToFirst"||ls==="arrowToSecond"||ls==="arrowBoth";
        if(isArrow){const drawTri=(ar)=>{if(!ar)return;ctx.save();ctx.globalAlpha=isDark?0.53:0.63;ctx.fillStyle=color;ctx.beginPath();ctx.moveTo(ar.tipX,ar.tipY);ctx.lineTo(ar.p1x,ar.p1y);ctx.lineTo(ar.p2x,ar.p2y);ctx.closePath();ctx.fill();ctx.restore();};
          if(ls==="arrowBoth"){drawTri(getArrowPoints(fc,tc,true));drawTri(getArrowPoints(fc,tc,false));}
          else if(ls==="arrowToSecond")drawTri(getArrowPoints(fc,tc,true));
          else drawTri(getArrowPoints(fc,tc,false));}
        const mid=(ls==="wavy"||ls==="zigzag")?{x:(fc.x+tc.x)/2,y:(fc.y+tc.y)/2}:getMidOfCurve(fc.x,fc.y,tc.x,tc.y);const lb=(rel.type==="custom"&&!rel.label)?"":rel.label||(RELATIONSHIP_TYPES[rel.type]?.label||"기타");
        if(lb){const pw=Math.max(50,lb.length*14+16);
        ctx.save();ctx.fillStyle=T.pill;ctx.beginPath();ctx.roundRect(mid.x-pw/2,mid.y-13,pw,26,13);ctx.fill();ctx.strokeStyle=color;ctx.lineWidth=1;ctx.stroke();ctx.restore();
        ctx.save();ctx.fillStyle=color;ctx.font="500 11px 'Noto Sans KR',sans-serif";ctx.textAlign="center";ctx.textBaseline="middle";ctx.fillText(lb,mid.x,mid.y);ctx.restore();}});

      const avatarImages={};await Promise.all(characters.filter(c=>c.avatar).map(ch=>new Promise(res=>{const im=new Image();im.crossOrigin="anonymous";im.onload=()=>{avatarImages[ch.id]=im;res();};im.onerror=()=>res();im.src=ch.avatar;})));
      characters.forEach(ch=>{const s=SIZE_LEVELS[ch.sizeLevel??2];
        ctx.save();ctx.shadowBlur=16;ctx.shadowColor="rgba(0,0,0,0.3)";ctx.shadowOffsetY=4;ctx.fillStyle="rgba(0,0,0,0.01)";ctx.beginPath();ctx.arc(ch.x,ch.y,s.radius,0,Math.PI*2);ctx.fill();ctx.restore();
        if(avatarImages[ch.id]){ctx.save();ctx.beginPath();ctx.arc(ch.x,ch.y,s.radius,0,Math.PI*2);ctx.clip();const im=avatarImages[ch.id],iw=im.naturalWidth,ih=im.naturalHeight,ts=s.radius*2,ia=iw/ih;let dw,dh,dx,dy;if(ia>1){dh=ts;dw=ts*ia;dx=ch.x-dw/2;dy=ch.y-dh/2;}else{dw=ts;dh=ts/ia;dx=ch.x-dw/2;dy=ch.y-dh/2;}ctx.drawImage(im,dx,dy,dw,dh);ctx.restore();ctx.save();ctx.strokeStyle=ch.color;ctx.lineWidth=3;ctx.beginPath();ctx.arc(ch.x,ch.y,s.radius+2,0,Math.PI*2);ctx.stroke();ctx.restore();}
        else{ctx.save();const g=ctx.createRadialGradient(ch.x,ch.y,0,ch.x,ch.y,s.radius);g.addColorStop(0,ch.color+"E6");g.addColorStop(1,ch.color+"99");ctx.fillStyle=g;ctx.beginPath();ctx.arc(ch.x,ch.y,s.radius,0,Math.PI*2);ctx.fill();ctx.strokeStyle=T.nodeStr;ctx.lineWidth=1.5;ctx.stroke();ctx.restore();ctx.save();ctx.fillStyle="#fff";ctx.font=`700 ${s.fontSize}px 'Noto Sans KR',sans-serif`;ctx.textAlign="center";ctx.textBaseline="middle";ctx.fillText(ch.name.charAt(0),ch.x,ch.y);ctx.restore();}
        const lh=26,ly=ch.y+s.radius+8;ctx.save();ctx.font=`500 ${s.labelFontSize}px 'Noto Sans KR',sans-serif`;const nameW=ctx.measureText(ch.name).width;const lw=Math.max(s.labelWidth,nameW+28);ctx.fillStyle=T.label;ctx.beginPath();ctx.roundRect(ch.x-lw/2,ly,lw,lh,13);ctx.fill();ctx.strokeStyle=T.labelBd;ctx.lineWidth=1;ctx.stroke();ctx.restore();ctx.save();ctx.fillStyle=T.labelTxt;ctx.font=`500 ${s.labelFontSize}px 'Noto Sans KR',sans-serif`;ctx.textAlign="center";ctx.textBaseline="middle";ctx.fillText(ch.name,ch.x,ly+lh/2);ctx.restore();});
      ctx.save();ctx.fillStyle=T.wm;ctx.font="500 12px 'Noto Sans KR',sans-serif";ctx.textAlign="right";ctx.fillText("인물관계도 메이커",maxX-16,maxY-16);ctx.restore();
      canvas.toBlob(blob=>{if(!blob){setIsExporting(false);return;}const a=document.createElement("a");a.href=URL.createObjectURL(blob);a.download=`${projectTitle||"character-map"}-${new Date().toISOString().slice(0,10)}.png`;document.body.appendChild(a);a.click();document.body.removeChild(a);URL.revokeObjectURL(a.href);setIsExporting(false);},"image/png");
    }catch(e){console.error(e);setIsExporting(false);}
  },[characters,relations,groups,T,projectTitle,projectLogo]);

  const handleMouseDown=useCallback((e,cid)=>{e.stopPropagation();if(connectingFrom){if(connectingFrom!==cid)setShowRelModal({from:connectingFrom,to:cid});setConnectingFrom(null);return;}const ch=characters.find(c=>c.id===cid);const p=getSvgPoint(e.clientX,e.clientY);setDragOffset({x:p.x-ch.x,y:p.y-ch.y});setDragging(cid);setSelectedChar(cid);},[characters,connectingFrom,getSvgPoint]);
  const handleMouseMove=useCallback(e=>{if(dragging){const p=getSvgPoint(e.clientX,e.clientY);setCharacters(pr=>pr.map(c=>c.id===dragging?{...c,x:p.x-dragOffset.x,y:p.y-dragOffset.y}:c));}else if(isPanning)setPan({x:e.clientX-panStart.x,y:e.clientY-panStart.y});},[dragging,dragOffset,getSvgPoint,isPanning,panStart]);
  const handleMouseUp=useCallback(()=>{setDragging(null);setIsPanning(false);},[]);
  const handleCanvasMouseDown=useCallback(e=>{if(connectingFrom){setConnectingFrom(null);return;}if(e.target===svgRef.current||e.target.tagName==="rect"){setSelectedChar(null);setIsPanning(true);setPanStart({x:e.clientX-pan.x,y:e.clientY-pan.y});}},[connectingFrom,pan]);
  const handleWheel=useCallback(e=>{e.preventDefault();
    const s=svgRef.current;if(!s)return;const r=s.getBoundingClientRect();
    const mx=e.clientX-r.left,my=e.clientY-r.top;
    const factor=e.deltaY>0?0.95:1.05;
    setZoom(prev=>{const nz=Math.max(0.3,Math.min(3,prev*factor));
      setPan(pp=>({x:mx-(mx-pp.x)*(nz/prev),y:my-(my-pp.y)*(nz/prev)}));return nz;});
  },[]);
  useEffect(()=>{const s=svgRef.current;if(s){s.addEventListener("wheel",handleWheel,{passive:false});return()=>s.removeEventListener("wheel",handleWheel);}},[handleWheel]);

  // Touch support
  const lastTapRef=useRef({time:0,id:null});
  const pinchRef=useRef({dist:0,zoom:1,mx:0,my:0,panX:0,panY:0});
  const getTouchXY=(t)=>({clientX:t.touches[0].clientX,clientY:t.touches[0].clientY});
  const getPinchDist=(t)=>{const dx=t.touches[0].clientX-t.touches[1].clientX,dy=t.touches[0].clientY-t.touches[1].clientY;return Math.sqrt(dx*dx+dy*dy);};

  const handleTouchDown=useCallback((e,cid)=>{e.stopPropagation();e.preventDefault();
    const now=Date.now();if(now-lastTapRef.current.time<300&&lastTapRef.current.id===cid){openEditModal(cid);lastTapRef.current={time:0,id:null};return;}
    lastTapRef.current={time:now,id:cid};
    if(connectingFrom){if(connectingFrom!==cid)setShowRelModal({from:connectingFrom,to:cid});setConnectingFrom(null);return;}
    const ch=characters.find(c=>c.id===cid);const{clientX,clientY}=getTouchXY(e);const p=getSvgPoint(clientX,clientY);
    setDragOffset({x:p.x-ch.x,y:p.y-ch.y});setDragging(cid);setSelectedChar(cid);
  },[characters,connectingFrom,getSvgPoint]);

  const handleTouchMove=useCallback(e=>{e.preventDefault();
    if(e.touches.length===2){
      const d=getPinchDist(e);const scale=d/pinchRef.current.dist;
      const nz=Math.max(0.3,Math.min(3,pinchRef.current.zoom*scale));
      const{mx,my,panX,panY,zoom:oz}=pinchRef.current;
      const ratio=nz/oz;
      setPan({x:mx-(mx-panX)*ratio,y:my-(my-panY)*ratio});
      setZoom(nz);return;
    }
    if(e.touches.length!==1)return;const{clientX,clientY}=getTouchXY(e);
    if(dragging){const p=getSvgPoint(clientX,clientY);setCharacters(pr=>pr.map(c=>c.id===dragging?{...c,x:p.x-dragOffset.x,y:p.y-dragOffset.y}:c));}
    else if(isPanning)setPan({x:clientX-panStart.x,y:clientY-panStart.y});
  },[dragging,dragOffset,getSvgPoint,isPanning,panStart]);

  const handleTouchUp=useCallback(()=>{setDragging(null);setIsPanning(false);},[]);

  const handleCanvasTouchStart=useCallback(e=>{
    if(e.touches.length===2){e.preventDefault();const s=svgRef.current;if(!s)return;const r=s.getBoundingClientRect();const mx=(e.touches[0].clientX+e.touches[1].clientX)/2-r.left;const my=(e.touches[0].clientY+e.touches[1].clientY)/2-r.top;pinchRef.current={dist:getPinchDist(e),zoom:zoom,mx,my,panX:pan.x,panY:pan.y};return;}
    if(connectingFrom){setConnectingFrom(null);return;}
    const touch=e.touches[0];const el=document.elementFromPoint(touch.clientX,touch.clientY);
    if(el===svgRef.current||el?.tagName==="rect"){setSelectedChar(null);setIsPanning(true);setPanStart({x:touch.clientX-pan.x,y:touch.clientY-pan.y});}
  },[connectingFrom,pan,zoom]);

  useEffect(()=>{const s=svgRef.current;if(!s)return;
    s.addEventListener("touchstart",handleCanvasTouchStart,{passive:false});
    s.addEventListener("touchmove",handleTouchMove,{passive:false});
    s.addEventListener("touchend",handleTouchUp,{passive:false});
    return()=>{s.removeEventListener("touchstart",handleCanvasTouchStart);s.removeEventListener("touchmove",handleTouchMove);s.removeEventListener("touchend",handleTouchUp);};
  },[handleCanvasTouchStart,handleTouchMove,handleTouchUp]);

  const resetRelForm=()=>{setRelType("friend");setRelLabel("");setRelCustomColor(null);setRelLineStyle("solid");};

  
  const addCharacter=()=>{if(!newName.trim())return;setCharacters(p=>[...p,{id:generateId(),name:newName.trim(),x:300+Math.random()*400,y:200+Math.random()*300,color:newColor,avatar:newAvatar,description:newDesc.trim(),sizeLevel:newSize}]);setNewName("");setNewDesc("");setNewColor(COLORS[Math.floor(Math.random()*COLORS.length)]);setNewAvatar(null);setNewSize(2);setShowAddModal(false);};
  const deleteCharacter=id=>{setCharacters(p=>p.filter(c=>c.id!==id));setRelations(p=>p.filter(r=>r.from!==id&&r.to!==id));setSelectedChar(null);setShowEditModal(null);};
  const addRelation=()=>{if(!showRelModal)return;const ic=relType==="custom";const d={type:relType,label:ic?relLabel.trim():"",customColor:ic?(relCustomColor||"#AAAAAA"):null,lineStyle:ic?relLineStyle:"solid"};const ex=relations.find(r=>(r.from===showRelModal.from&&r.to===showRelModal.to)||(r.from===showRelModal.to&&r.to===showRelModal.from));if(ex)setRelations(p=>p.map(r=>r.id===ex.id?{...r,...d}:r));else setRelations(p=>[...p,{id:generateId(),from:showRelModal.from,to:showRelModal.to,...d}]);setShowRelModal(null);resetRelForm();};
  const openEditRelation=rel=>{setRelType(rel.type);setRelLabel(rel.label||"");setRelCustomColor(rel.customColor||null);setRelLineStyle(rel.lineStyle||"solid");setShowRelModal({from:rel.from,to:rel.to,editId:rel.id});};
  const saveRelationEdit=()=>{if(!showRelModal?.editId){addRelation();return;}const ic=relType==="custom";setRelations(p=>p.map(r=>r.id===showRelModal.editId?{...r,type:relType,label:ic?relLabel.trim():"",customColor:ic?(relCustomColor||"#AAAAAA"):null,lineStyle:ic?relLineStyle:"solid"}:r));setShowRelModal(null);resetRelForm();};
  // FIX: delete relation properly closes modal
  const deleteRelation=rid=>{setRelations(p=>p.filter(r=>r.id!==rid));setShowRelModal(null);resetRelForm();};
  const openEditModal=cid=>{const ch=characters.find(c=>c.id===cid);if(ch){setEditName(ch.name);setEditDesc(ch.description||"");setEditColor(ch.color);setEditAvatar(ch.avatar);setEditSize(ch.sizeLevel??2);setShowEditModal(cid);}};
  const saveEdit=()=>{if(!editName.trim())return;setCharacters(p=>p.map(c=>c.id===showEditModal?{...c,name:editName.trim(),description:editDesc.trim(),color:editColor,avatar:editAvatar,sizeLevel:editSize}:c));setShowEditModal(null);};
  const getCharRelations=cid=>relations.filter(r=>r.from===cid||r.to===cid);

  const modalStyle={position:"fixed",top:0,left:0,right:0,bottom:0,background:T.overlay,backdropFilter:"blur(8px)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:1000};
  const cardStyle={background:`linear-gradient(145deg,${T.card[0]},${T.card[1]})`,borderRadius:"20px",padding:"32px",width:"420px",maxWidth:"90vw",border:`1px solid ${T.cardBd}`,boxShadow:T.shadow,maxHeight:"85vh",overflowY:"auto"};
  const inputStyle={width:"100%",padding:"12px 16px",background:T.input,border:`1px solid ${T.inputBd}`,borderRadius:"12px",color:T.text,fontSize:"14px",outline:"none",boxSizing:"border-box",fontFamily:"'Noto Sans KR',sans-serif"};
  const btnP={padding:"12px 24px",background:"linear-gradient(135deg,#6366F1,#8B5CF6)",border:"none",borderRadius:"12px",color:"#fff",fontSize:"14px",fontWeight:"600",cursor:"pointer",fontFamily:"'Noto Sans KR',sans-serif"};
  const btnS={padding:"12px 24px",background:T.btnSec,border:`1px solid ${T.btnSecBd}`,borderRadius:"12px",color:T.btnSecC,fontSize:"14px",cursor:"pointer",fontFamily:"'Noto Sans KR',sans-serif"};

  const AvatarUpload=({avatar,onUpload,onRemove})=>(<div style={{display:"flex",alignItems:"center",gap:"16px"}}><div style={{width:72,height:72,borderRadius:"50%",background:avatar?"none":T.input,border:`2px dashed ${T.inputBd}`,display:"flex",alignItems:"center",justifyContent:"center",overflow:"hidden",flexShrink:0}}>{avatar&&<img src={avatar} alt="" style={{width:"100%",height:"100%",objectFit:"cover"}}/>}</div><div style={{display:"flex",flexDirection:"column",gap:"6px"}}><button onClick={onUpload} style={{...btnS,padding:"8px 16px",fontSize:"12px"}}>📁 사진 {avatar?"변경":"선택"}</button>{avatar&&<button onClick={onRemove} style={{...btnS,padding:"6px 16px",fontSize:"11px",color:"#FF6B6B",borderColor:"rgba(255,80,80,0.2)"}}>✕ 제거</button>}</div></div>);
  const SizeSelector=({value,onChange})=>(<div style={{display:"flex",alignItems:"center",gap:"10px"}}>{[0,1,2,3,4].map(i=><button key={i} onClick={()=>onChange(i)} style={{width:16+i*8,height:16+i*8,borderRadius:"50%",background:value===i?"linear-gradient(135deg,#6366F1,#8B5CF6)":T.input,border:value===i?"2px solid #6366F1":`2px solid ${T.inputBd}`,cursor:"pointer"}}/>)}<span style={{fontSize:"11px",color:T.textMut,marginLeft:"4px"}}>{["아주 작게","작게","보통","크게","아주 크게"][value]}</span></div>);
  const LineStyleOption=({styleKey,selected,onClick})=>{const sc=selected?"#A5B4FC":T.textMut;return(<button onClick={onClick} style={{padding:"10px 12px",borderRadius:"10px",border:`1px solid ${selected?"#6366F1":T.btnSecBd}`,background:selected?"rgba(99,102,241,0.1)":T.btnSec,cursor:"pointer",display:"flex",alignItems:"center",gap:"10px",fontFamily:"'Noto Sans KR',sans-serif",color:selected?"#A5B4FC":T.btnSecC,fontSize:"12px"}}><svg width="40" height="16" viewBox="0 0 40 16">{styleKey==="solid"&&<line x1="0" y1="8" x2="40" y2="8" stroke={sc} strokeWidth="2"/>}{styleKey==="dashed"&&<line x1="0" y1="8" x2="40" y2="8" stroke={sc} strokeWidth="2" strokeDasharray="4,3"/>}{styleKey==="arrowToFirst"&&<><line x1="8" y1="8" x2="40" y2="8" stroke={sc} strokeWidth="2"/><polygon points="0,8 10,3 10,13" fill={sc}/></>}{styleKey==="arrowToSecond"&&<><line x1="0" y1="8" x2="32" y2="8" stroke={sc} strokeWidth="2"/><polygon points="40,8 30,3 30,13" fill={sc}/></>}{styleKey==="arrowBoth"&&<><line x1="8" y1="8" x2="32" y2="8" stroke={sc} strokeWidth="2"/><polygon points="0,8 10,3 10,13" fill={sc}/><polygon points="40,8 30,3 30,13" fill={sc}/></>}{styleKey==="wavy"&&<path d="M0,8 Q3,2 6,8 Q9,14 12,8 Q15,2 18,8 Q21,14 24,8 Q27,2 30,8 Q33,14 36,8 L40,8" fill="none" stroke={sc} strokeWidth="2"/>}{styleKey==="zigzag"&&<polyline points="0,8 5,2 10,14 15,2 20,14 25,2 30,14 35,2 40,8" fill="none" stroke={sc} strokeWidth="2"/>}</svg><span>{LINE_STYLES[styleKey].label}</span></button>);};

  const isTransparent = themeId === "transparent";
  const checkerBg = "repeating-conic-gradient(#d0d0d0 0% 25%, #f0f0f0 0% 50%) 0 0 / 20px 20px";
  const mainBg = isTransparent ? checkerBg : `linear-gradient(135deg,${T.bg[0]} 0%,${T.bg[1]} 50%,${T.bg[2]} 100%)`;

  return(<div style={{width:"100vw",height:"100vh",overflow:"hidden",background:mainBg,fontFamily:"'Noto Sans KR',sans-serif",position:"relative",userSelect:"none",transition:"background 0.4s"}}>
    <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@300;400;500;700;900&family=Playfair+Display:wght@700&display=swap" rel="stylesheet"/>
    <input ref={fileInputRef} type="file" accept="image/*" style={{display:"none"}} onChange={e=>{handleImageUpload(e.target.files[0],setNewAvatar);e.target.value="";}}/>
    <input ref={editFileInputRef} type="file" accept="image/*" style={{display:"none"}} onChange={e=>{handleImageUpload(e.target.files[0],setEditAvatar);e.target.value="";}}/>
    <input ref={logoInputRef} type="file" accept="image/*" style={{display:"none"}} onChange={e=>{handleImageUpload(e.target.files[0],setTempLogo);e.target.value="";}}/>
    <input ref={jsonInputRef} type="file" accept=".json" style={{display:"none"}} onChange={e=>{importJson(e.target.files[0]);e.target.value="";setShowFab(false);}}/>

    {/* Top center: big title */}
    <div onClick={()=>{setTempTitle(projectTitle);setTempLogo(projectLogo);setShowTitleModal(true);}} style={{position:"absolute",top:"52px",left:"50%",transform:"translateX(-50%)",zIndex:100,cursor:"pointer",display:"flex",alignItems:"center",gap:"8px",padding:(projectTitle||projectLogo)?"10px 36px":"12px 28px",borderRadius:"20px",border:`1px dashed ${(projectTitle||projectLogo)?"transparent":T.btnSecBd}`,background:(projectTitle||projectLogo)?"transparent":T.btnSec,transition:"all 0.2s",maxWidth:"80vw"}} onMouseEnter={e=>{e.currentTarget.style.background=T.input;e.currentTarget.style.borderColor=T.btnSecBd;}} onMouseLeave={e=>{e.currentTarget.style.background=(projectTitle||projectLogo)?"transparent":T.btnSec;e.currentTarget.style.borderColor=(projectTitle||projectLogo)?"transparent":T.btnSecBd;}}>
      {projectLogo&&<img src={projectLogo} alt="" style={{height:"74px",maxWidth:"230px",objectFit:"contain",borderRadius:"10px"}}/>}
      {projectTitle?<span style={{fontSize:"28px",fontWeight:"900",color:T.text,whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis",letterSpacing:"-0.8px",lineHeight:"1.1"}}>{projectTitle}</span>:!projectLogo?<span style={{fontSize:"14px",color:T.textMut}}>✏️ 관계도 이름을 설정하세요</span>:null}
    </div>

    {/* Left top: branding + info */}
    <div style={{position:"absolute",top:"16px",left:"20px",zIndex:100,display:"flex",alignItems:"center",gap:"10px"}}>
      <span style={{fontSize:"18px",fontWeight:"700",color:T.text,opacity:0.5}}>인물관계도 메이커</span>
      <button onClick={()=>setShowInfo(true)} style={{width:"26px",height:"26px",borderRadius:"50%",border:`1px solid ${T.btnSecBd}`,background:T.btnSec,color:T.btnSecC,fontSize:"13px",fontWeight:"700",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",opacity:0.7,fontFamily:"serif"}}>?</button>
    </div>

    {connectingFrom&&<div style={{position:"absolute",top:"80px",left:"50%",transform:"translateX(-50%)",zIndex:100,padding:"10px 24px",borderRadius:"100px",background:"linear-gradient(135deg,#6366F1,#8B5CF6)",color:"#fff",fontSize:"13px",fontWeight:"500",boxShadow:"0 8px 32px rgba(99,102,241,0.3)"}}>"{characters.find(c=>c.id===connectingFrom)?.name}" → 연결할 인물을 클릭하세요</div>}

    <svg ref={svgRef} style={{width:"100%",height:"100%",cursor:isPanning?"grabbing":(connectingFrom?"crosshair":"grab"),touchAction:"none"}} onMouseDown={handleCanvasMouseDown} onMouseMove={handleMouseMove} onMouseUp={handleMouseUp} onMouseLeave={handleMouseUp}>
      <defs>
        <filter id="glow"><feGaussianBlur stdDeviation="3" result="cb"/><feMerge><feMergeNode in="cb"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
        <filter id="shadow"><feDropShadow dx="0" dy="4" stdDeviation="8" floodColor="#000" floodOpacity={isDark?"0.4":"0.15"}/></filter>
        <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse"><circle cx="20" cy="20" r="0.5" fill={T.grid}/></pattern>
        <style>{`@keyframes da{to{stroke-dashoffset:-20}}`}</style>
      </defs>
      <g transform={`translate(${pan.x},${pan.y}) scale(${zoom})`}>
        <rect width={canvasSize.width} height={canvasSize.height} fill="url(#grid)"/>
        {groups.map(g=>{const gh=getGroupHull(g);if(!gh)return null;return(
          <g key={g.id} onClick={e=>{e.stopPropagation();openEditGroup(g);}} style={{cursor:"pointer"}}>
            <path d={gh.path} fill={g.color} opacity="0.1" stroke="none"/>
            <path d={gh.path} fill="none" stroke={g.color} strokeWidth="2" strokeDasharray="8,5" opacity="0.3"/>
            {g.name&&<text x={gh.labelX} y={gh.labelY} fill={g.color} fontSize="12" fontWeight="700" opacity="0.75">{g.name}</text>}
          </g>);})}
        {relations.map(rel=>{const fc=characters.find(c=>c.id===rel.from),tc=characters.find(c=>c.id===rel.to);if(!fc||!tc)return null;const color=getRelColor(rel),ls=rel.lineStyle||"solid",pathD=getRelPathD(rel,fc,tc),mid=getRelMid(rel,fc,tc),lb=(rel.type==="custom"&&!rel.label)?"":rel.label||(RELATIONSHIP_TYPES[rel.type]?.label||"기타"),pw=Math.max(50,lb.length*14+16);
          let arrow=null,arrow2=null;if(ls==="arrowToFirst"||ls==="arrowToSecond"||ls==="arrowBoth"){arrow=getArrowPoints(fc,tc,ls==="arrowToSecond"||ls==="arrowBoth");if(ls==="arrowBoth")arrow2=getArrowPoints(fc,tc,false);if(ls==="arrowToFirst")arrow=getArrowPoints(fc,tc,false);}
          const rlGlow=isDark?"0.11":"0.11",rlLine=isDark?"0.53":"0.63",rlArrow=isDark?"0.53":"0.63";
          return(<g key={rel.id}><path d={pathD} fill="none" stroke={color} strokeWidth="6" opacity={rlGlow} filter="url(#glow)"/><path d={pathD} fill="none" stroke="transparent" strokeWidth="16" style={{cursor:"pointer"}} onClick={e=>{e.stopPropagation();openEditRelation(rel);}}/><path d={pathD} fill="none" stroke={color} strokeWidth="2.5" strokeDasharray={ls==="dashed"?"8,4":"none"} opacity={rlLine} style={{pointerEvents:"none"}}/>{arrow&&<polygon points={`${arrow.tipX},${arrow.tipY} ${arrow.p1x},${arrow.p1y} ${arrow.p2x},${arrow.p2y}`} fill={color} opacity={rlArrow}/>}{arrow2&&<polygon points={`${arrow2.tipX},${arrow2.tipY} ${arrow2.p1x},${arrow2.p1y} ${arrow2.p2x},${arrow2.p2y}`} fill={color} opacity={rlArrow}/>}{lb&&<><rect x={mid.x-pw/2} y={mid.y-14} width={pw} height="28" rx="14" fill={T.pill} stroke={color} strokeWidth="1" opacity="0.73" style={{cursor:"pointer"}} onClick={e=>{e.stopPropagation();openEditRelation(rel);}}/><text x={mid.x} y={mid.y+4} textAnchor="middle" fill={color} fontSize="11" fontWeight="500" style={{pointerEvents:"none"}}>{lb}</text></>}{!lb&&<circle cx={mid.x} cy={mid.y} r="10" fill="transparent" style={{cursor:"pointer"}} onClick={e=>{e.stopPropagation();openEditRelation(rel);}}/>}</g>);})}
        {characters.map(ch=>{const isSel=selectedChar===ch.id,isConn=connectingFrom===ch.id,s=SIZE_LEVELS[ch.sizeLevel??2];return(<g key={ch.id} onMouseDown={e=>handleMouseDown(e,ch.id)} onTouchStart={e=>handleTouchDown(e,ch.id)} onDoubleClick={e=>{e.stopPropagation();openEditModal(ch.id);}} style={{cursor:dragging===ch.id?"grabbing":"pointer"}}>{(isSel||isConn)&&<circle cx={ch.x} cy={ch.y} r={s.radius+12} fill="none" stroke={isConn?"#6366F1":ch.color} strokeWidth="2" strokeDasharray="4,4" opacity="0.6" style={{animation:"da 2s linear infinite"}}/>}<circle cx={ch.x} cy={ch.y+3} r={s.radius} fill="rgba(0,0,0,0.2)" filter="url(#shadow)"/>
          {ch.avatar?(<><defs><clipPath id={`ac-${ch.id}`}><circle cx={ch.x} cy={ch.y} r={s.radius}/></clipPath></defs><circle cx={ch.x} cy={ch.y} r={s.radius+2} fill="none" stroke={isSel?T.selStr:ch.color} strokeWidth={isSel?"3":"2.5"}/><image href={ch.avatar} x={ch.x-s.radius} y={ch.y-s.radius} width={s.radius*2} height={s.radius*2} clipPath={`url(#ac-${ch.id})`} preserveAspectRatio="xMidYMid slice" style={{pointerEvents:"none"}}/></>):(<><defs><radialGradient id={`g-${ch.id}`}><stop offset="0%" stopColor={ch.color} stopOpacity="0.9"/><stop offset="100%" stopColor={ch.color} stopOpacity="0.6"/></radialGradient></defs><circle cx={ch.x} cy={ch.y} r={s.radius} fill={`url(#g-${ch.id})`} stroke={isSel?T.selStr:T.nodeStr} strokeWidth={isSel?"3":"1.5"}/><text x={ch.x} y={ch.y} textAnchor="middle" dominantBaseline="central" fill="#fff" fontSize={s.fontSize} fontWeight="700" style={{pointerEvents:"none"}}>{ch.name.charAt(0)}</text></>)}
          <foreignObject x={ch.x-150} y={ch.y+s.radius+4} width="300" height="34" style={{pointerEvents:"none",overflow:"visible"}}><div xmlns="http://www.w3.org/1999/xhtml" style={{display:"flex",justifyContent:"center"}}><div style={{display:"inline-block",padding:"4px 14px",borderRadius:"13px",background:T.label,border:`1px solid ${T.labelBd}`,fontSize:`${s.labelFontSize}px`,fontWeight:"500",color:T.labelTxt,fontFamily:"'Noto Sans KR',sans-serif",whiteSpace:"nowrap",textAlign:"center"}}>{ch.name}</div></div></foreignObject>{ch.description&&<title>{ch.name}: {ch.description}</title>}</g>);})}
      </g>
    </svg>

    {/* Bottom-right FAB */}
    <div className="fab-area" style={{position:"absolute",bottom:"70px",right:"16px",zIndex:200,display:"flex",flexDirection:"column",alignItems:"flex-end",gap:"8px"}}>
      {showFab&&<>
        <button onClick={()=>{setShowThemePanel(p=>!p);setShowFab(false);}} style={{...btnS,padding:"10px 18px",fontSize:"13px",display:"flex",alignItems:"center",gap:"8px",boxShadow:T.pShadow,borderRadius:"14px"}}>🎨 배경 색상</button>
        <button onClick={()=>{exportToPng();setShowFab(false);}} disabled={isExporting} style={{...btnS,padding:"10px 18px",fontSize:"13px",display:"flex",alignItems:"center",gap:"8px",boxShadow:T.pShadow,borderRadius:"14px",background:"linear-gradient(135deg,rgba(34,197,94,0.15),rgba(34,197,94,0.05))",borderColor:"rgba(34,197,94,0.3)",color:"#22C55E"}}>{isExporting?"⏳":"📸"} PNG 저장</button>
        <button onClick={()=>{exportJson();setShowFab(false);}} style={{...btnS,padding:"10px 18px",fontSize:"13px",display:"flex",alignItems:"center",gap:"8px",boxShadow:T.pShadow,borderRadius:"14px"}}>💾 내보내기</button>
        <button onClick={()=>{jsonInputRef.current?.click();}} style={{...btnS,padding:"10px 18px",fontSize:"13px",display:"flex",alignItems:"center",gap:"8px",boxShadow:T.pShadow,borderRadius:"14px"}}>📂 불러오기</button>
        <button onClick={()=>{if(selectedChar){setConnectingFrom(selectedChar);setShowFab(false);}}} style={{...btnS,padding:"10px 18px",fontSize:"13px",display:"flex",alignItems:"center",gap:"8px",boxShadow:T.pShadow,borderRadius:"14px",opacity:selectedChar?1:0.4}}>🔗 관계 연결</button>
        <button onClick={()=>{setShowAddModal(true);setShowFab(false);}} style={{...btnP,padding:"10px 18px",fontSize:"13px",display:"flex",alignItems:"center",gap:"8px",boxShadow:"0 8px 24px rgba(99,102,241,0.3)",borderRadius:"14px"}}>+ 인물 추가</button>
        <button onClick={()=>{setGroupName("");setGroupColor(COLORS[4]);setGroupMembers([]);setShowGroupModal("new");setShowFab(false);}} style={{...btnP,padding:"10px 18px",fontSize:"13px",display:"flex",alignItems:"center",gap:"8px",boxShadow:"0 8px 24px rgba(99,102,241,0.3)",borderRadius:"14px",background:"linear-gradient(135deg,#F59E0B,#D97706)"}}>📦 그룹 추가</button>
      </>}
      <button onClick={()=>setShowFab(p=>!p)} style={{width:"56px",height:"56px",borderRadius:"50%",background:"linear-gradient(135deg,#6366F1,#8B5CF6)",border:"none",color:"#fff",fontSize:"24px",cursor:"pointer",boxShadow:"0 8px 24px rgba(99,102,241,0.4)",display:"flex",alignItems:"center",justifyContent:"center",transition:"transform 0.2s",transform:showFab?"rotate(45deg)":"rotate(0deg)"}}>+</button>
    </div>

    {/* Theme panel - opens UPWARD from bottom-right, inside viewport */}
    {showThemePanel&&<div className="theme-area" style={{position:"absolute",bottom:"136px",right:"16px",zIndex:200,background:`linear-gradient(145deg,${T.card[0]},${T.card[1]})`,borderRadius:"16px",padding:"20px",border:`1px solid ${T.cardBd}`,boxShadow:T.shadow,width:"220px"}}>
      <div style={{fontSize:"13px",fontWeight:"600",color:T.text,marginBottom:"14px"}}>🎨 배경 색상</div>
      <div style={{display:"flex",gap:"10px",flexWrap:"wrap",justifyContent:"center"}}>
        {BG_THEMES.map(t=><button key={t.id} onClick={()=>{setThemeId(t.id);setShowThemePanel(false);}} title={t.label} style={{width:"40px",height:"40px",borderRadius:"50%",border:themeId===t.id?"3px solid #6366F1":"3px solid transparent",background:t.id==="transparent"?"repeating-conic-gradient(#d0d0d0 0% 25%, #f0f0f0 0% 50%) 0 0 / 10px 10px":t.swatch,cursor:"pointer",transition:"all 0.15s",boxShadow:themeId===t.id?"0 0 0 2px rgba(99,102,241,0.3)":"none"}}/>)}
      </div>
      <button onClick={()=>setShowThemePanel(false)} style={{...btnS,padding:"8px",fontSize:"12px",width:"100%",marginTop:"14px",borderRadius:"10px"}}>닫기</button>
    </div>}

    {/* Zoom - bottom left */}
    <div className="zoom-area" style={{position:"absolute",bottom:"70px",left:"16px",zIndex:100,display:"flex",gap:"4px"}}>
      <button onClick={()=>setZoom(z=>Math.min(3,z*1.2))} style={{...btnS,padding:"8px 14px",fontSize:"16px",lineHeight:"1",borderRadius:"10px"}}>+</button>
      <button onClick={()=>{setZoom(1);setPan({x:0,y:0});}} style={{...btnS,padding:"8px 14px",fontSize:"11px",borderRadius:"10px"}}>{Math.round(zoom*100)}%</button>
      <button onClick={()=>setZoom(z=>Math.max(0.3,z*0.8))} style={{...btnS,padding:"8px 14px",fontSize:"16px",lineHeight:"1",borderRadius:"10px"}}>−</button>
    </div>

    {/* Selected info */}
    {selectedChar&&!showEditModal&&(()=>{const ch=characters.find(c=>c.id===selectedChar);if(!ch)return null;const cr=getCharRelations(selectedChar);return(<div style={{position:"absolute",bottom:"90px",left:"24px",zIndex:100,background:`linear-gradient(145deg,${T.panel[0]},${T.panel[1]})`,backdropFilter:"blur(12px)",borderRadius:"16px",padding:"20px",border:`1px solid ${T.cardBd}`,width:"280px",boxShadow:T.pShadow}}>
      <div style={{display:"flex",alignItems:"center",gap:"12px",marginBottom:"12px"}}><div style={{width:"44px",height:"44px",borderRadius:"50%",background:ch.avatar?"none":`linear-gradient(135deg,${ch.color},${ch.color}88)`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:"18px",fontWeight:"700",color:"#fff",overflow:"hidden",flexShrink:0,border:ch.avatar?`2px solid ${ch.color}`:"none"}}>{ch.avatar?<img src={ch.avatar} alt="" style={{width:"100%",height:"100%",objectFit:"cover"}}/>:ch.name.charAt(0)}</div><div><div style={{fontSize:"16px",fontWeight:"600",color:T.text}}>{ch.name}</div><div style={{fontSize:"11px",color:T.textSec}}>{ch.description||"설명 없음"}</div></div></div>
      {cr.length>0&&<div style={{marginBottom:"12px"}}><div style={{fontSize:"11px",color:T.textMut,marginBottom:"6px",letterSpacing:"1px"}}>관계</div>{cr.map(r=>{const ot=characters.find(c=>c.id===(r.from===selectedChar?r.to:r.from));const col=getRelColor(r);const lb=r.label||(RELATIONSHIP_TYPES[r.type]?.label||"기타");return ot?<div key={r.id} onClick={()=>openEditRelation(r)} style={{display:"flex",alignItems:"center",gap:"8px",padding:"6px 8px",fontSize:"12px",color:T.text,cursor:"pointer",borderRadius:"8px"}} onMouseEnter={e=>e.currentTarget.style.background=T.input} onMouseLeave={e=>e.currentTarget.style.background="transparent"}><div style={{width:8,height:8,borderRadius:"50%",background:col,flexShrink:0}}/><span>{ot.name}</span><span style={{color:col,fontSize:"11px"}}>({lb})</span></div>:null;})}</div>}
      <div style={{display:"flex",gap:"6px"}}><button onClick={()=>openEditModal(selectedChar)} style={{...btnS,padding:"8px 14px",fontSize:"12px",flex:1}}>✏️ 편집</button><button onClick={()=>setConnectingFrom(selectedChar)} style={{...btnS,padding:"8px 14px",fontSize:"12px",flex:1}}>🔗 연결</button><button onClick={(e)=>{e.stopPropagation();const id=selectedChar;const nm=ch.name;setConfirmModal({message:`"${nm}"을(를) 삭제할까요?`,onConfirm:()=>{setCharacters(p=>p.filter(c=>c.id!==id));setRelations(p=>p.filter(r=>r.from!==id&&r.to!==id));setSelectedChar(null);setConfirmModal(null);}});}} style={{...btnS,padding:"8px 14px",fontSize:"12px",borderColor:"rgba(255,80,80,0.3)",color:"#FF6B6B"}}>🗑️</button></div>
    </div>);})()}


    {/* Title Modal */}
    {showTitleModal&&<div style={modalStyle} onClick={()=>setShowTitleModal(false)}><div style={cardStyle} onClick={e=>e.stopPropagation()}>
      <h3 style={{margin:"0 0 24px",color:T.text,fontSize:"18px",fontWeight:"600"}}>📝 관계도 이름 설정</h3>
      <div style={{display:"flex",flexDirection:"column",gap:"16px"}}>
        <div><label style={{fontSize:"12px",color:T.textSec,marginBottom:"6px",display:"block"}}>텍스트 입력</label><input value={tempTitle} onChange={e=>setTempTitle(e.target.value)} placeholder="관계도 이름을 입력하세요" style={inputStyle} onKeyDown={e=>{if(e.key==="Enter"){setProjectTitle(tempTitle.trim());setProjectLogo(tempLogo);setShowTitleModal(false);}}} autoFocus/></div>
        <div><label style={{fontSize:"12px",color:T.textSec,marginBottom:"8px",display:"block"}}>로고 이미지 (선택)</label><div style={{display:"flex",alignItems:"center",gap:"16px"}}><div style={{width:80,height:50,borderRadius:"10px",background:tempLogo?"none":T.input,border:`2px dashed ${T.inputBd}`,display:"flex",alignItems:"center",justifyContent:"center",overflow:"hidden",flexShrink:0}}>{tempLogo?<img src={tempLogo} alt="" style={{width:"100%",height:"100%",objectFit:"contain"}}/>:<span style={{fontSize:"20px",opacity:0.4}}>🖼️</span>}</div><div style={{display:"flex",flexDirection:"column",gap:"6px"}}><button onClick={()=>logoInputRef.current?.click()} style={{...btnS,padding:"8px 16px",fontSize:"12px"}}>📁 {tempLogo?"변경":"업로드"}</button>{tempLogo&&<button onClick={()=>setTempLogo(null)} style={{...btnS,padding:"6px 16px",fontSize:"11px",color:"#FF6B6B",borderColor:"rgba(255,80,80,0.2)"}}>✕ 제거</button>}</div></div></div>
        {(tempTitle||tempLogo)&&<div><label style={{fontSize:"12px",color:T.textSec,marginBottom:"8px",display:"block"}}>미리보기</label><div style={{padding:"12px 20px",borderRadius:"12px",background:T.input,display:"flex",alignItems:"center",justifyContent:"center",gap:"12px"}}>{tempLogo&&<img src={tempLogo} alt="" style={{height:"40px",maxWidth:"120px",objectFit:"contain",borderRadius:"6px"}}/>}{tempTitle.trim()&&<span style={{fontSize:"24px",fontWeight:"900",color:T.text}}>{tempTitle.trim()}</span>}</div></div>}
        <div style={{display:"flex",gap:"8px",justifyContent:"flex-end",marginTop:"8px"}}>{(projectTitle||projectLogo)&&<button onClick={()=>{setProjectTitle("");setProjectLogo(null);setShowTitleModal(false);}} style={{...btnS,color:"#FF6B6B",borderColor:"rgba(255,80,80,0.3)",marginRight:"auto"}}>초기화</button>}<button onClick={()=>setShowTitleModal(false)} style={btnS}>취소</button><button onClick={()=>{setProjectTitle(tempTitle.trim());setProjectLogo(tempLogo);setShowTitleModal(false);}} style={btnP}>저장</button></div>
      </div>
    </div></div>}

    {showAddModal&&<div style={modalStyle} onClick={()=>{setShowAddModal(false);setNewAvatar(null);setNewSize(2);}}><div style={cardStyle} onClick={e=>e.stopPropagation()}><h3 style={{margin:"0 0 24px",color:T.text,fontSize:"18px",fontWeight:"600"}}>✨ 새 인물 추가</h3><div style={{display:"flex",flexDirection:"column",gap:"16px"}}><div><label style={{fontSize:"12px",color:T.textSec,marginBottom:"8px",display:"block"}}>프로필 사진</label><AvatarUpload avatar={newAvatar} onUpload={()=>fileInputRef.current?.click()} onRemove={()=>setNewAvatar(null)}/></div><div><label style={{fontSize:"12px",color:T.textSec,marginBottom:"6px",display:"block"}}>이름 *</label><input value={newName} onChange={e=>setNewName(e.target.value)} placeholder="캐릭터 이름" style={inputStyle} onKeyDown={e=>e.key==="Enter"&&addCharacter()} autoFocus/></div><div><label style={{fontSize:"12px",color:T.textSec,marginBottom:"6px",display:"block"}}>설명</label><input value={newDesc} onChange={e=>setNewDesc(e.target.value)} placeholder="간단한 설명 (선택)" style={inputStyle}/></div><div><label style={{fontSize:"12px",color:T.textSec,marginBottom:"8px",display:"block"}}>크기</label><SizeSelector value={newSize} onChange={setNewSize}/></div><div><label style={{fontSize:"12px",color:T.textSec,marginBottom:"8px",display:"block"}}>테두리 색상</label><div style={{display:"flex",gap:"8px",flexWrap:"wrap"}}>{COLORS.map(c=><div key={c} onClick={()=>setNewColor(c)} style={{width:"32px",height:"32px",borderRadius:"50%",background:c,cursor:"pointer",border:newColor===c?"3px solid #6366F1":"3px solid transparent"}}/>)}</div></div><div style={{display:"flex",gap:"8px",justifyContent:"flex-end",marginTop:"8px"}}><button onClick={()=>{setShowAddModal(false);setNewAvatar(null);setNewSize(2);}} style={btnS}>취소</button><button onClick={addCharacter} style={{...btnP,opacity:newName.trim()?1:0.5}}>추가</button></div></div></div></div>}

    {showEditModal&&<div style={modalStyle} onClick={()=>setShowEditModal(null)}><div style={cardStyle} onClick={e=>e.stopPropagation()}><h3 style={{margin:"0 0 24px",color:T.text,fontSize:"18px",fontWeight:"600"}}>✏️ 인물 편집</h3><div style={{display:"flex",flexDirection:"column",gap:"16px"}}><div><label style={{fontSize:"12px",color:T.textSec,marginBottom:"8px",display:"block"}}>프로필 사진</label><AvatarUpload avatar={editAvatar} onUpload={()=>editFileInputRef.current?.click()} onRemove={()=>setEditAvatar(null)}/></div><div><label style={{fontSize:"12px",color:T.textSec,marginBottom:"6px",display:"block"}}>이름 *</label><input value={editName} onChange={e=>setEditName(e.target.value)} style={inputStyle} autoFocus/></div><div><label style={{fontSize:"12px",color:T.textSec,marginBottom:"6px",display:"block"}}>설명</label><input value={editDesc} onChange={e=>setEditDesc(e.target.value)} style={inputStyle}/></div><div><label style={{fontSize:"12px",color:T.textSec,marginBottom:"8px",display:"block"}}>크기</label><SizeSelector value={editSize} onChange={setEditSize}/></div><div><label style={{fontSize:"12px",color:T.textSec,marginBottom:"8px",display:"block"}}>테두리 색상</label><div style={{display:"flex",gap:"8px",flexWrap:"wrap"}}>{COLORS.map(c=><div key={c} onClick={()=>setEditColor(c)} style={{width:"32px",height:"32px",borderRadius:"50%",background:c,cursor:"pointer",border:editColor===c?"3px solid #6366F1":"3px solid transparent"}}/>)}</div></div><div style={{display:"flex",gap:"8px",justifyContent:"flex-end",marginTop:"8px"}}><button onClick={(e)=>{e.stopPropagation();const id=showEditModal;const ch=characters.find(c=>c.id===id);if(!ch)return;const nm=ch.name;setConfirmModal({message:`"${nm}"을(를) 삭제할까요?`,onConfirm:()=>{setCharacters(p=>p.filter(c=>c.id!==id));setRelations(p=>p.filter(r=>r.from!==id&&r.to!==id));setSelectedChar(null);setShowEditModal(null);setConfirmModal(null);}});}} style={{...btnS,color:"#FF6B6B",borderColor:"rgba(255,80,80,0.3)",marginRight:"auto"}}>삭제</button><button onClick={()=>setShowEditModal(null)} style={btnS}>취소</button><button onClick={saveEdit} style={btnP}>저장</button></div></div></div></div>}

    {showRelModal&&<div style={modalStyle} onClick={()=>{setShowRelModal(null);resetRelForm();}}><div style={cardStyle} onClick={e=>e.stopPropagation()}>
      <h3 style={{margin:"0 0 8px",color:T.text,fontSize:"18px",fontWeight:"600"}}>{showRelModal.editId?"✏️ 관계 편집":"🔗 관계 설정"}</h3>
      <div style={{fontSize:"13px",color:T.textSec,marginBottom:"24px"}}>{characters.find(c=>c.id===showRelModal.from)?.name} ↔ {characters.find(c=>c.id===showRelModal.to)?.name}</div>
      <div style={{display:"flex",flexDirection:"column",gap:"16px"}}>
        <div><label style={{fontSize:"12px",color:T.textSec,marginBottom:"8px",display:"block"}}>관계 유형</label><div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"8px"}}>{Object.entries(RELATIONSHIP_TYPES).map(([k,v])=><button key={k} onClick={()=>{setRelType(k);if(k!=="custom"){setRelCustomColor(null);setRelLineStyle("solid");setRelLabel("");}}} style={{padding:"10px 14px",borderRadius:"12px",border:`1px solid ${relType===k?v.color:T.btnSecBd}`,background:relType===k?`${v.color}15`:T.btnSec,color:relType===k?v.color:T.btnSecC,cursor:"pointer",fontSize:"13px",textAlign:"left",fontFamily:"'Noto Sans KR',sans-serif"}}>{v.label}</button>)}</div></div>
        {relType==="custom"&&<><div><label style={{fontSize:"12px",color:T.textSec,marginBottom:"6px",display:"block"}}>커스텀 라벨</label><input value={relLabel} onChange={e=>setRelLabel(e.target.value)} placeholder="예: 소꿉친구, 의붓형제..." style={inputStyle} onKeyDown={e=>e.key==="Enter"&&(showRelModal.editId?saveRelationEdit():addRelation())}/></div><div><label style={{fontSize:"12px",color:T.textSec,marginBottom:"8px",display:"block"}}>관계선 색상</label><div style={{display:"flex",gap:"7px",flexWrap:"wrap"}}>{REL_COLORS.map(c=><div key={c} onClick={()=>setRelCustomColor(c)} style={{width:"28px",height:"28px",borderRadius:"50%",background:c==="BW"?BW_COLOR:c,cursor:"pointer",border:relCustomColor===c?"3px solid #6366F1":"3px solid transparent"}}/>)}</div></div><div><label style={{fontSize:"12px",color:T.textSec,marginBottom:"8px",display:"block"}}>선 종류</label><div style={{display:"flex",flexDirection:"column",gap:"6px"}}>{Object.keys(LINE_STYLES).map(k=><LineStyleOption key={k} styleKey={k} selected={relLineStyle===k} onClick={()=>setRelLineStyle(k)}/>)}</div></div></>}
        <div style={{display:"flex",gap:"8px",justifyContent:"flex-end",marginTop:"8px"}}>
          {showRelModal.editId&&<button onClick={(e)=>{e.stopPropagation();const rid=showRelModal.editId;setConfirmModal({message:"이 관계를 삭제할까요?",onConfirm:()=>{setRelations(p=>p.filter(r=>r.id!==rid));setShowRelModal(null);resetRelForm();setConfirmModal(null);}});}} style={{...btnS,color:"#FF6B6B",borderColor:"rgba(255,80,80,0.3)",marginRight:"auto"}}>삭제</button>}
          <button onClick={()=>{setShowRelModal(null);resetRelForm();}} style={btnS}>취소</button>
          <button onClick={showRelModal.editId?saveRelationEdit:addRelation} style={btnP}>{showRelModal.editId?"저장":"연결"}</button>
        </div>
      </div>
    </div></div>}

    {/* Footer credit */}
    <style>{`.credit-line{position:absolute;left:50%;transform:translateX(-50%);z-index:10;white-space:nowrap;pointer-events:none;bottom:8px;font-size:15px;opacity:0.45}@media(max-width:768px){.credit-line{bottom:112px;font-size:10px}}.fab-area{bottom:24px!important}@media(max-width:768px){.fab-area{bottom:70px!important}}.zoom-area{bottom:24px!important}@media(max-width:768px){.zoom-area{bottom:70px!important}}.theme-area{bottom:90px!important}@media(max-width:768px){.theme-area{bottom:136px!important}}`}</style>
    <div className="credit-line" style={{color:T.textMut}}>이 사이트는 Claude를 통해 제작되었습니다.</div>

    {/* Info Modal */}
    {showInfo&&<div style={modalStyle} onClick={()=>setShowInfo(false)}><div style={{...cardStyle,width:"500px",maxHeight:"85vh",overflowY:"auto"}} onClick={e=>e.stopPropagation()}>
      <h3 style={{margin:"0 0 24px",color:T.text,fontSize:"20px",fontWeight:"800",textAlign:"center"}}>사이트 이용방법</h3>
      <div style={{display:"flex",flexDirection:"column",gap:"18px",fontSize:"13px",color:T.text,opacity:0.85,lineHeight:"1.9"}}>
        <div style={{padding:"14px 16px",borderRadius:"14px",background:T.input}}>
          <div style={{fontWeight:"700",color:T.text,marginBottom:"6px",fontSize:"14px"}}>👤 인물 추가</div>
          <div>우측 하단 <span style={{fontWeight:"600"}}>+ 버튼</span> → <span style={{fontWeight:"600"}}>인물 추가</span>를 통해 캐릭터의 이름, 사진, 설명을 설정해주세요. 테두리의 색깔과 사진의 크기도 변경 가능합니다.</div>
        </div>
        <div style={{padding:"14px 16px",borderRadius:"14px",background:T.input}}>
          <div style={{fontWeight:"700",color:T.text,marginBottom:"6px",fontSize:"14px"}}>🔗 관계 연결</div>
          <div>인물 클릭 → <span style={{fontWeight:"600"}}>관계 연결</span>을 통해 인물 간의 관계를 설정해주세요.<br/><span style={{fontWeight:"600"}}>기타</span> 항목을 통해 관계의 이름, 색깔, 선 종류 커스텀도 가능합니다.</div>
        </div>
        <div style={{padding:"14px 16px",borderRadius:"14px",background:T.input}}>
          <div style={{fontWeight:"700",color:T.text,marginBottom:"6px",fontSize:"14px"}}>✏️ 편집 · 수정</div>
          <div>인물 또는 관계를 클릭해 해당 항목의 수정 또는 삭제가 가능합니다.<br/><span style={{color:"#EF4444",fontSize:"11px"}}>(삭제 되돌리기 불가)</span></div>
        </div>
        <div style={{padding:"14px 16px",borderRadius:"14px",background:T.input}}>
          <div style={{fontWeight:"700",color:T.text,marginBottom:"6px",fontSize:"14px"}}>📦 그룹</div>
          <div><span style={{fontWeight:"600"}}>+ 버튼</span> → <span style={{fontWeight:"600"}}>그룹 추가</span>를 통해 인물을 묶을 수 있습니다.<br/>그룹 영역을 클릭하면 편집/삭제할 수 있습니다.</div>
        </div>

        <div style={{padding:"14px 16px",borderRadius:"14px",background:T.input}}>
          <div style={{fontWeight:"700",color:T.text,marginBottom:"6px",fontSize:"14px"}}>🎨 테마 설정</div>
          <div><span style={{fontWeight:"600"}}>+ 버튼</span> → <span style={{fontWeight:"600"}}>배경 색상</span>을 통해 배경색 변경이 가능합니다.<br/>체커보드 클릭 시 배경이 투명화된 PNG로 저장 가능합니다.</div>
        </div>
        <div style={{padding:"14px 16px",borderRadius:"14px",background:T.input}}>
          <div style={{fontWeight:"700",color:T.text,marginBottom:"6px",fontSize:"14px"}}>📛 관계도 이름 설정</div>
          <div>사이트 상단에 있는 공간을 클릭해 관계도의 이름을 바꿀 수 있습니다.<br/>텍스트 대신 이미지 삽입도 가능합니다.</div>
        </div>
        <div style={{padding:"14px 16px",borderRadius:"14px",background:T.input}}>
          <div style={{fontWeight:"700",color:T.text,marginBottom:"6px",fontSize:"14px"}}>🖼️ PNG 저장</div>
          <div>관계도를 완성했다면 <span style={{fontWeight:"600"}}>+ 버튼</span> → <span style={{fontWeight:"600"}}>PNG 저장</span>을 통해 완성본 이미지를<br/>다운로드할 수 있습니다.</div>
        </div>
        <div style={{padding:"14px 16px",borderRadius:"14px",background:T.input}}>
          <div style={{fontWeight:"700",color:T.text,marginBottom:"6px",fontSize:"14px"}}>💾 내보내기 / 불러오기</div>
          <div>관계도를 나중에 이어서 수정하고 싶거나 다른 사람과 공유하고 싶다면<br/><span style={{fontWeight:"600"}}>+ 버튼</span>에서 이 두 가지 기능을 사용하세요.</div>
        </div>
        <div style={{fontSize:"13px",color:T.textMut,textAlign:"center",marginTop:"4px"}}>길을 잃었다면 사이트 하단의 확대율 버튼을 클릭하세요.</div>
      </div>
      <div style={{display:"flex",justifyContent:"flex-end",marginTop:"24px"}}>
        <button onClick={()=>setShowInfo(false)} style={btnP}>확인</button>
      </div>
    </div></div>}
    {showGroupModal&&<div style={modalStyle} onClick={()=>setShowGroupModal(null)}><div style={cardStyle} onClick={e=>e.stopPropagation()}>
      <h3 style={{margin:"0 0 24px",color:T.text,fontSize:"18px",fontWeight:"600"}}>{showGroupModal==="new"?"📦 새 그룹":"📦 그룹 편집"}</h3>
      <div style={{display:"flex",flexDirection:"column",gap:"16px"}}>
        <div><label style={{fontSize:"12px",color:T.textSec,marginBottom:"6px",display:"block"}}>그룹 이름</label><input value={groupName} onChange={e=>setGroupName(e.target.value)} placeholder="예: 학생회, 길드..." style={inputStyle} autoFocus/></div>
        <div><label style={{fontSize:"12px",color:T.textSec,marginBottom:"8px",display:"block"}}>색상</label><div style={{display:"flex",gap:"8px",flexWrap:"wrap"}}>{COLORS.map(c=><div key={c} onClick={()=>setGroupColor(c)} style={{width:"28px",height:"28px",borderRadius:"50%",background:c,cursor:"pointer",border:groupColor===c?"3px solid #6366F1":"3px solid transparent"}}/>)}</div></div>
        <div><label style={{fontSize:"12px",color:T.textSec,marginBottom:"8px",display:"block"}}>멤버</label><div style={{display:"flex",gap:"8px",flexWrap:"wrap"}}>{characters.map(c=><button key={c.id} onClick={()=>setGroupMembers(p=>p.includes(c.id)?p.filter(x=>x!==c.id):[...p,c.id])} style={{padding:"7px 14px",borderRadius:"20px",border:`2px solid ${groupMembers.includes(c.id)?c.color:T.btnSecBd}`,background:groupMembers.includes(c.id)?`${c.color}20`:T.btnSec,color:groupMembers.includes(c.id)?c.color:T.btnSecC,cursor:"pointer",fontSize:"13px",fontFamily:"'Noto Sans KR',sans-serif",transition:"all 0.15s"}}>{groupMembers.includes(c.id)?"✓ ":""}{c.name}</button>)}</div></div>
        <div style={{display:"flex",gap:"8px",justifyContent:"flex-end",marginTop:"8px"}}>
          {showGroupModal!=="new"&&<button onClick={()=>{setGroups(p=>p.filter(g=>g.id!==showGroupModal));setShowGroupModal(null);}} style={{...btnS,color:"#FF6B6B",borderColor:"rgba(255,80,80,0.3)",marginRight:"auto"}}>삭제</button>}
          <button onClick={()=>setShowGroupModal(null)} style={btnS}>취소</button>
          <button onClick={()=>{if(groupMembers.length===0)return;if(showGroupModal==="new"){setGroups(p=>[...p,{id:generateId(),name:groupName,color:groupColor,members:groupMembers}]);}else{setGroups(p=>p.map(g=>g.id===showGroupModal?{...g,name:groupName,color:groupColor,members:groupMembers}:g));}setShowGroupModal(null);}} style={{...btnP,opacity:groupMembers.length?1:0.4}}>
            {showGroupModal==="new"?"추가":"저장"}
          </button>
        </div>
      </div>
    </div></div>}
    {/* Confirm Modal */}
    {confirmModal&&<div style={modalStyle} onClick={()=>setConfirmModal(null)}><div style={{...cardStyle,width:"340px",textAlign:"center"}} onClick={e=>e.stopPropagation()}><p style={{color:T.text,fontSize:"15px",marginBottom:"24px",lineHeight:"1.6"}}>{confirmModal.message}</p><div style={{display:"flex",gap:"10px",justifyContent:"center"}}><button onClick={()=>setConfirmModal(null)} style={btnS}>취소</button><button onClick={confirmModal.onConfirm} style={{...btnP,background:"linear-gradient(135deg,#EF4444,#DC2626)"}}>삭제</button></div></div></div>}
  </div>);
}
