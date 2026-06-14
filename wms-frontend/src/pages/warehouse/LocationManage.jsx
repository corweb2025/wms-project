import { useEffect, useState } from 'react'
import { api } from '../../lib/api'
import { Box, Layers, MapPin, Plus, Pencil, Trash2 } from 'lucide-react'

export default function LocationManage(){
  const [whs,setWhs]=useState([]); 
  const [selWh,setSelWh]=useState(null)
  const [zones,setZones]=useState([]); 
  const [selZone,setSelZone]=useState(null);
  const [locs,setLocs]=useState([]);

  const loadWhs = async ()=>{ const r=await api.get('/wh/warehouses'); setWhs(r.data); if(!selWh) setSelWh(r.data[0]) }
  const loadZones = async ()=>{ if(!selWh) return; const r=await api.get('/wh/zones',{params:{warehouse_id:selWh.id}}); setZones(r.data); setSelZone(r.data[0]) }
  const loadLocs = async ()=>{ if(!selZone) return; const r=await api.get('/wh/locations',{params:{zone_id:selZone.id}}); setLocs(r.data) }

  useEffect(()=>{loadWhs()},[])
  useEffect(()=>{loadZones()},[selWh])
  useEffect(()=>{loadLocs()},[selZone])

  // --- 창고 CRUD ---
  const addWh = async ()=>{ const name=prompt('창고명'); if(!name) return; const code=prompt('코드 (W03)'); const type=prompt('타입 (일반/냉장/냉동)','일반'); await api.post('/wh/warehouses',{name,code,type}); loadWhs() }
  const editWh = async (w,e)=>{ e.stopPropagation(); const name=prompt('창고명',w.name); const code=prompt('코드',w.code); const type=prompt('타입',w.type); await api.put(`/wh/warehouses/${w.id}`,{name,code,type}); loadWhs() }
  const delWh = async (w,e)=>{ e.stopPropagation(); if(!confirm(`${w.name} 삭제? 하위 존/로케이션 모두 삭제됩니다.`)) return; await api.delete(`/wh/warehouses/${w.id}`); setSelWh(null); loadWhs() }

  // --- Zone CRUD ---
  const addZone = async ()=>{ const name=prompt('구역명 (예: C구역 (부자재))'); if(!name) return; const code=prompt('코드 (C)'); await api.post('/wh/zones',{warehouse_id:selWh.id,code,name}); loadZones() }
  const editZone = async (z,e)=>{ e.stopPropagation(); const name=prompt('구역명',z.name); const code=prompt('코드',z.code); await api.put(`/wh/zones/${z.id}`,{code,name}); loadZones() }
  const delZone = async (z,e)=>{ e.stopPropagation(); if(!confirm(`${z.name} 삭제?`)) return; await api.delete(`/wh/zones/${z.id}`); loadZones() }

  // --- Location CRUD ---
  const addLoc = async ()=>{ 
    const code=prompt('로케이션 코드 (A-03-01)'); 
    if(!code) return; 
    await api.post('/wh/locations2',{zone_id:selZone.id,code,capacity:1000}); 
    loadLocs();
  }
  const editLoc = async (l)=>{ const code=prompt('코드',l.code); const cap=prompt('용량',l.capacity); await api.put(`/wh/locations/${l.id}`,{code,capacity:cap}); loadLocs() }
  const delLoc = async (l)=>{ if(!confirm(`${l.code} 삭제?`)) return; await api.delete(`/wh/locations/${l.id}`); loadLocs() }

  return (
    <div className="p-4 h-full">
      <div className="grid grid-cols-12 gap-4 h-[calc(100vh-88px)]">
        {/* 창고 */}
        <div className="col-span-3 bg-white rounded-xl shadow-sm">
          <div className="flex items-center justify-between px-4 h-12 border-b">
            <h3 className="font-semibold flex items-center gap-2"><Box size={16}/>창고 목록</h3>
            <Plus size={18} className="cursor-pointer hover:text-blue-600" onClick={addWh}/>
          </div>
          <div className="p-3 space-y-2">{whs.map(w=>(
            <div key={w.id} onClick={()=>setSelWh(w)} className={`group p-3 rounded-lg border cursor-pointer ${selWh?.id===w.id?'bg-blue-50 border-blue-200':'hover:bg-gray-50'}`}>
              <div className="flex justify-between"><span className="font-medium text-sm">{w.name}</span>
                <span className="flex gap-2 opacity-0 group-hover:opacity-100"><Pencil size={14} onClick={e=>editWh(w,e)}/><Trash2 size={14} onClick={e=>delWh(w,e)}/></span>
              </div>
              <div className="flex justify-between mt-1"><span className="text-xs text-gray-500">코드: {w.code}</span><span className="text-[11px] px-2 py-0.5 bg-gray-100 rounded">{w.type}</span></div>
            </div>))}
          </div>
        </div>
        {/* Zone */}
        <div className="col-span-3 bg-white rounded-xl shadow-sm">
          <div className="flex items-center justify-between px-4 h-12 border-b"><h3 className="font-semibold flex items-center gap-2"><Layers size={16}/>구역(Zone) 목록</h3><Plus size={18} className="cursor-pointer hover:text-blue-600" onClick={addZone}/></div>
          <div className="p-3 space-y-2">{zones.map(z=>(
            <div key={z.id} onClick={()=>setSelZone(z)} className={`group p-3 rounded-lg border cursor-pointer ${selZone?.id===z.id?'bg-blue-50 border-blue-200':'hover:bg-gray-50'}`}>
              <div className="flex justify-between"><span className="font-medium text-sm">{z.name}</span>
                <span className="flex gap-2 opacity-0 group-hover:opacity-100"><Pencil size={14} onClick={e=>editZone(z,e)}/><Trash2 size={14} onClick={e=>delZone(z,e)}/></span>
              </div>
              <div className="text-xs text-gray-500 mt-1">로케이션: {z.loc_count}개</div>
            </div>))}
          </div>
        </div>
        {/* Location */}
        <div className="col-span-6 bg-white rounded-xl shadow-sm">
          <div className="flex items-center justify-between px-4 h-12 border-b"><h3 className="font-semibold flex items-center gap-2"><MapPin size={16}/>로케이션 관리 <span className="text-gray-500 font-normal">({selZone?.name})</span></h3>
            <button onClick={addLoc} className="px-3 py-1.5 text-sm bg-[#2563eb] text-white rounded-lg">+ 로케이션 추가</button>
          </div>
          <div className="p-4"><table className="w-full text-sm"><thead className="text-gray-500 border-b"><tr><th className="text-left py-2">코드</th><th className="text-right">용량</th><th className="text-right">사용량</th><th>사용률</th><th className="text-center">관리</th></tr></thead>
            <tbody>{locs.map(l=>{ const r=Math.round(l.used/l.capacity*100); return (
              <tr key={l.id} className="border-b hover:bg-gray-50"><td className="py-2.5">{l.code}</td><td className="text-right">{l.capacity}</td><td className="text-right">{l.used}</td>
                <td><div className="flex items-center gap-2"><div className="w-24 h-1.5 bg-gray-200 rounded"><div className={`h-1.5 rounded ${r>=80?'bg-amber-500':'bg-emerald-500'}`} style={{width:`${r}%`}}/></div>{r}%</div></td>
                <td className="text-center"><Pencil size={16} className="inline mr-3 cursor-pointer" onClick={()=>editLoc(l)}/><Trash2 size={16} className="inline cursor-pointer" onClick={()=>delLoc(l)}/></td>
              </tr>)})}</tbody></table></div>
        </div>
      </div>
    </div>
  )
}