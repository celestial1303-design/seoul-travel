/**
 * Seoul Travel Planner - Interactive Application Logic
 * Supports Day switching, localStorage persistence, currency converter,
 * packing checklist, Korean audio pronunciation, and custom spot management.
 */

// Initial Trip Dataset based on user itinerary
// Flight schedule details
const flightData = {
  airline: "中華航空 (CHINA AIRLINES)",
  outbound: {
    flight: "CI160",
    date: "2026/10/28 (週三)",
    from: "台北桃園國際機場 (TPE)",
    fromTerminal: "第一航廈 (T1)",
    depTime: "07:50",
    to: "首爾仁川國際機場 (ICN)",
    toTerminal: "第二航廈 (T2)",
    arrTime: "11:20",
    duration: "2小時30分",
    class: "經濟艙 (N)",
    baggage: "1件 (23公斤)",
    fareBasis: "NLF",
    status: "已確認 (OK)"
  },
  inbound: {
    flight: "CI163",
    date: "2026/11/01 (週日)",
    from: "首爾仁川國際機場 (ICN)",
    fromTerminal: "第二航廈 (T2)",
    depTime: "20:15",
    to: "台北桃園國際機場 (TPE)",
    toTerminal: "第一航廈 (T1)",
    arrTime: "22:15",
    duration: "3小時00分",
    class: "經濟艙 (R)",
    baggage: "1件 (23公斤)",
    fareBasis: "RLF",
    status: "已確認 (OK)"
  }
};

// Initial Trip Dataset
const defaultItinerary = [
  {
    "day": 1,
    "title": "第一天：2026/10/28 (三) 桃園啟程 ✈️ 仁川抵達 ＆ 弘大豚壽百 ＆ poca spot",
    "dateHint": "10/28 (三)",
    "summary": "搭乘中華航空 CI160 班機抵達首爾仁川 (T2)，搭乘 AREX 直達弘大辦理入住或寄放行李。隨後前往弘大商圈品嚐道地「豚壽百」濃郁豬肉湯飯，並朝聖全球最大 K-POP 偶像小卡專賣店「POCA SPOT 弘大店」，漫步弘大潮流街區！",
    "spots": [
      {
        "id": "d1-s0",
        "name": "中華航空 CI160 航班（台北桃園 ✈️ 首爾仁川）",
        "nameKr": "중화항공 CI160 (TPE T1 ➔ ICN T2)",
        "type": "transit",
        "typeName": "去程航班",
        "time": "07:50 - 11:20 (05:30 報到)",
        "transitNotice": "🛫 航班起飛：台北桃園 T1 (07:50) ➔ 首爾仁川 T2 (11:20)",
        "desc": "05:30 抵達桃園國際機場第一航廈 (T1) 華航櫃台辦理報到託運（免費行李 1 件 23KG），07:50 準時起飛，飛行約 2 小時 30 分，於 11:20 降落首爾仁川國際機場第二航廈 (T2)。",
        "tips": "✈️ 報到提醒：航班起飛前 48 小時可於華航官網辦理預約自動報到；仁川降落後前往入境海關查驗、提領行李，並至機場 B1 儲值購買 WOWPASS / T-money。",
        "naverQuery": "인천국제공항 제2여객터미널",
        "googleQuery": "Incheon International Airport Terminal 2",
        "completed": false,
        "note": "華航 T1 報到，仁川降落 T2"
      },
      {
        "id": "d1-s0-arex",
        "name": "搭乘 AREX 機場鐵路直達弘大入口站",
        "nameKr": "공항철도 일반열차 (홍대입구역 방면)",
        "type": "transit",
        "typeName": "機場交通",
        "time": "12:30 - 13:30",
        "transitNotice": "⏱️ 車程提醒：仁川 T2 至弘大入口站約 58 分鐘",
        "desc": "從仁川機場 T2 交通中心搭乘機場鐵路 (AREX) 普通列車（All-Stop Train），一線直達弘大入口站，無需在首爾站轉乘拖行李，省時又平價。",
        "tips": "🚇 乘車提醒：刷 T-money 或 WOWPASS 即可進站；普通列車班次密集（約 10-15 分鐘一班）。",
        "naverQuery": "홍대입구역 공항철도",
        "googleQuery": "Hongik University Station AREX",
        "completed": false,
        "note": ""
      },
      {
        "id": "d1-s1",
        "name": "飯店辦理入住 / 行李寄放",
        "nameKr": "호텔 체크인",
        "type": "hotel",
        "typeName": "住宿入住",
        "time": "14:00 - 14:45",
        "transitNotice": null,
        "desc": "抵達弘大住宿地點辦理 Check-in 或先行寄放行李。弘大交通方便、生活機能極佳，先卸下重擔再輕鬆出門！",
        "tips": "💡 提醒：若提早抵達可先向櫃台寄存行李，領取房卡後確認 Wi-Fi 與門禁時間。",
        "naverQuery": "홍대 호텔",
        "googleQuery": "Hongdae Hotel Seoul",
        "completed": false,
        "note": ""
      },
      {
        "id": "d1-s2",
        "name": "豚壽百 弘大總店 (釜山式豬肉湯飯)",
        "nameKr": "돈수백 홍대직영점",
        "type": "food",
        "typeName": "必吃美食",
        "time": "15:00 午餐",
        "transitNotice": null,
        "desc": "弘大鼎鼎大名的釜山式豬肉湯飯名店，24 小時營業。湯頭經慢火精燉呈乳白色，濃醇甘甜無腥味，搭配鮮嫩白切肉、蝦醬、韭菜與熱騰騰米飯，溫潤暖胃，是第一天抵達首爾洗去旅途疲勞的極品慰勞！",
        "tips": "🍜 吃法推薦：先喝一口純白原湯，再依喜好加入少許蝦醬提鮮、韭菜與辣醬拌入米飯；必點招牌「豚壽百定食」(돈수백)，附獨立加熱石盤白切肉切盤！",
        "naverQuery": "돈수백 홍대직영점",
        "googleQuery": "Donsoobaek Hongdae",
        "completed": false,
        "note": ""
      },
      {
        "id": "d1-s3",
        "name": "POCA SPOT 弘大店 (포카스팟 · K-POP 偶像小卡專賣店)",
        "nameKr": "포카스팟 홍대점 (POCA SPOT)",
        "type": "shopping",
        "typeName": "追星聖地 & 購物",
        "time": "16:30 下午",
        "transitNotice": null,
        "desc": "【新版行程重點】K-POP 追星粉絲熱烈推薦的弘大必逛聖地！全球最大規模的偶像小卡 (Photocard) 線下實體專賣店之一。店內擁有海量偶像收藏庫存，涵蓋熱門男團女團（SEVENTEEN、Stray Kids、NewJeans、IVE、aespa、TWICE、BTS 等）以及最新出道新人。店內配備多語言智慧平板 Kiosk 系統，輕鬆點選團體與成員即可快速挑選心儀小卡，現場更有驚喜抽卡機、盲盒與小卡拍照裝飾專區！",
        "tips": "🏷️ 尋寶秘訣：免去海外網購繁瑣運費與漫長等待，現場可直接挑選並驗證卡況；出發前可先於 Pocamarket 官方網站確認最新小卡庫存，熱門限定卡往往一上架就被搶購！",
        "naverQuery": "포카스팟 홍대",
        "googleQuery": "POCA SPOT Hongdae",
        "completed": false,
        "note": ""
      },
      {
        "id": "d1-s4",
        "name": "弘大商圈漫遊 ＆ 街頭藝人表演",
        "nameKr": "홍대 걷고싶은거리",
        "type": "shopping",
        "typeName": "潮流街區",
        "time": "18:30 傍晚至夜間",
        "transitNotice": null,
        "desc": "首爾年輕人與潮流文化的聚集核心！涵蓋弘大「想漫步的街道」、Kakao Friends 弘大旗艦店、平價潮流服飾、文創風格小店。傍晚起步行街有精采的街頭 K-POP 舞蹈、街舞與自彈自唱街頭藝人表演，活力十足！",
        "tips": "🛍️ 推薦：Kakao Friends 旗艦店 3 樓有 Ryan 咖啡廳；傍晚後步行街有超精彩的街頭街舞及音樂表演；沿途亦有多家潮牌小店與飾品店。",
        "naverQuery": "홍대 걷고싶은거리",
        "googleQuery": "Hongdae Shopping Street",
        "completed": false,
        "note": ""
      }
    ]
  },
  {
    "day": 2,
    "title": "第二天：京畿道近郊童話旅（南怡島 ＆ 小法國村 ＆ 弘大金豬食堂）",
    "dateHint": "Day 2",
    "summary": "出發前往加平名勝！車程約 2.5 小時抵達南怡島漫步水杉林與島上享用午餐，午後車程約 1.5 小時造訪浪漫小法國村，傍晚車程約 2.5 小時返回弘大，享受米其林必比登推薦「金豬食堂」頂級精品烤肉！",
    "bannerImg": "nami.jpg",
    "bannerCaption": "加平名勝 · 南怡島水杉林蔭道",
    "spots": [
      {
        "id": "d2-s1",
        "name": "出發往南怡島（交通轉乘）",
        "nameKr": "남이섬 가는 길",
        "type": "transit",
        "typeName": "交通移動",
        "time": "07:30 出發",
        "transitNotice": "⏱️ 車程提醒：首爾弘大至南怡島單程約 2 小時 30 分",
        "desc": "從首爾弘大搭乘地鐵至龍山站或清涼里站，轉乘 ITX-青春號高鐵列車抵達「加平站 (Gapyeong Station)」，再轉搭加平觀光循環巴士或計程車前往渡輪碼頭。",
        "tips": "🚄 提醒：ITX-青春號車票建議提早於 Korail 官網預約劃位；抵達加平碼頭後，可選擇搭乘經典渡輪或體驗刺激的高空飛索 (Zip-wire) 登島！",
        "naverQuery": "남이섬 선착장",
        "googleQuery": "Nami Island Ferry Wharf",
        "completed": false,
        "note": ""
      },
      {
        "id": "d2-s2",
        "name": "南怡島漫遊 ＆ 島上隨便吃 (美味午餐)",
        "nameKr": "남이섬 & 섬에서 자유 점心",
        "type": "attraction",
        "typeName": "自然風光 & 午餐",
        "time": "10:30 上午",
        "transitNotice": null,
        "desc": "韓劇《冬季戀歌》浪漫取景地。四季景緻動人，筆直聳立的水杉林蔭大道、銀杏路、江畔步道與鴕鳥園讓人心曠神怡。中午依心情在南怡島上隨便吃！",
        "tips": "🍽️ 中餐規劃：南怡島上隨便吃！島內與碼頭有多樣選擇，推薦春川辣炒雞排 (닭갈비)、戴手套搖勻的懷舊鐵盒搖搖便當 (추억의 도시락)、現烤松香紅豆熱包子！",
        "naverQuery": "남이섬",
        "googleQuery": "Nami Island",
        "completed": false,
        "note": ""
      },
      {
        "id": "d2-s3-transit",
        "name": "前往小法國村（交通移動）",
        "nameKr": "남이섬 ➔ 쁘띠프랑스 이동",
        "type": "transit",
        "typeName": "交通移動",
        "time": "13:30 下午",
        "transitNotice": "⏱️ 車程提醒：南怡島至小法國村車程約 1 小時 30 分",
        "desc": "從南怡島搭乘渡輪返回碼頭後，搭乘加平觀光循環巴士或計程車前往小法國村，車程約 1.5 小時。",
        "tips": "🚌 乘車指南：可搭乘加平觀光巴士 A 路線直接串聯，亦可與同行旅伴合搭計程車更舒適省時。",
        "naverQuery": "쁘띠프랑스",
        "googleQuery": "Petite France Gapyeong",
        "completed": false,
        "note": ""
      },
      {
        "id": "d2-s4",
        "name": "小法國村 (Petite France) ＆ 義大利小鎮",
        "nameKr": "쁘띠프랑스",
        "type": "attraction",
        "typeName": "異國名勝",
        "time": "15:00 下午",
        "transitNotice": null,
        "desc": "以《小王子》為主題的法式童話聚落，繽紛的歐風馬卡龍色建築群依山面湖。韓劇《來自星星的你》、《秘密花園》取景勝地，旁邊亦有小義大利村可順遊。",
        "tips": "📸 拍照亮點：露天劇場整點有手偶木偶戲表演，從小王子紀念館頂樓平台可俯瞰清平湖絕美湖光山色！",
        "naverQuery": "쁘띠프랑스",
        "googleQuery": "Petite France Gapyeong",
        "completed": false,
        "note": ""
      },
      {
        "id": "d2-s5",
        "name": "弘大金豬食堂 (米其林必比登推薦頂級烤肉)",
        "nameKr": "금돼지식당 (골든피그)",
        "type": "food",
        "typeName": "必吃排隊名店",
        "time": "19:00 晚間",
        "transitNotice": "⏱️ 車程提醒：從小法國村返回弘大車程約 2 小時 30 分",
        "desc": "首爾超人氣的頂級精品烤肉店，榮獲米其林必比登推薦，也是 BTS 防彈少年團、IU 等眾多韓星的愛店！招牌帶骨五花肉 (본삼겹) 與特選豬頸肉肉質鮮甜多汁，店員全程代烤掌握完美熟度。",
        "tips": "🥩 排隊小撇步：店內人氣極旺，可提早利用 Catch Table App 線上確認候位，或提早前往登記排隊；沾英國馬爾頓天然海鹽與大蔥醬油更是絕配！",
        "naverQuery": "금돼지식당",
        "googleQuery": "Geumdwaeji Sikdang Seoul",
        "completed": false,
        "note": ""
      }
    ]
  },
  {
    "day": 3,
    "title": "第三天：朝鮮歷史風華與傳統舌尖漫步（景福宮 ＆ 土俗村蔘雞湯 ＆ 廣藏市場）",
    "dateHint": "Day 3",
    "summary": "換穿精緻韓服探訪朝鮮正宮「景福宮」，中午大啖首爾最傳奇的名店「土俗村蔘鷄湯」補氣暖身！午後漫步「北村韓屋村」古典巷弄與世界遺產「昌德宮／秘苑」，晚間前進熱鬧喧騰的「廣藏市場」盡享道地平民小吃！",
    "spots": [
      {
        "id": "d3-s1",
        "name": "景福宮 (光化門與韓服體驗)",
        "nameKr": "경복궁 & 한복체험",
        "type": "attraction",
        "typeName": "古蹟巡禮",
        "time": "09:30 上午",
        "transitNotice": null,
        "desc": "朝鮮王朝的正宮與規模最大的宮殿。勤政殿的雄偉氣勢與慶會樓的池畔水榭如詩如畫。身穿整套韓服可享免費入宮參觀，拍照效果絕美！",
        "tips": "👑 特色儀式：每日 10:00 與 14:00 在光化門前廣場有守門將換崗儀式；安國站或景福宮站周邊有多家韓服租借店可預約髮型與配件。",
        "naverQuery": "경복궁",
        "googleQuery": "Gyeongbokgung Palace",
        "completed": false,
        "note": ""
      },
      {
        "id": "d3-s2",
        "name": "中餐：土俗村 蔘鷄湯 (首爾第一元祖名店)",
        "nameKr": "토속촌 삼계탕 (Tosokchon Samgyetang)",
        "type": "food",
        "typeName": "傳奇名店",
        "time": "11:45 午餐",
        "transitNotice": null,
        "desc": "【新版指定美食】首爾享譽國際、無人不知的人蔘雞湯第一名店！亦為韓國前總統盧武鉉生前經常光顧的傳奇餐廳。店面由多座古色古香的傳統韓屋打通而成，湯頭以四年生人蔘、南瓜子、黑芝麻、松子、銀杏、栗子、核桃與糯米填入整隻鮮嫩童子雞長時間燉熬，湯底呈奶白濃稠，滋補甘潤，香氣四溢！",
        "tips": "🥣 獨家吃法：隨餐附贈一小杯人蔘酒，可直接單飲或趁熱倒入滾燙雞湯中拌勻增添醇厚風味；桌上的醃蘿蔔辛奇與白菜泡菜無限享用，搭配嫩雞肉極度開胃！",
        "naverQuery": "토속촌 삼계탕",
        "googleQuery": "Tosokchon Samgyetang",
        "completed": false,
        "note": ""
      },
      {
        "id": "d3-s3",
        "name": "北村韓屋村",
        "nameKr": "북촌한옥마을",
        "type": "attraction",
        "typeName": "傳統聚落",
        "time": "13:30 下午",
        "transitNotice": null,
        "desc": "被景福宮、昌德宮和宗廟環繞的百年傳統韓屋聚落。保存完整的青瓦白牆與石板小徑，依山傍勢，從高處還能眺望遠方首爾市中心與南山首爾塔的現代天際線。",
        "tips": "🤫 注意事項：此處為一般居民實際居住區，請務必保持輕聲細語，並請在觀光開放時間內（約 10:00-17:00）參觀。",
        "naverQuery": "북촌한옥마을",
        "googleQuery": "Bukchon Hanok Village",
        "completed": false,
        "note": ""
      },
      {
        "id": "d3-s4",
        "name": "昌德宮 ＆ 秘苑 (後苑)",
        "nameKr": "창덕궁 & 후원 (비원)",
        "type": "attraction",
        "typeName": "世界文化遺產",
        "time": "15:30 下午",
        "transitNotice": null,
        "desc": "聯合國教科文組織世界文化遺產。宮殿依自然山勢建造，後苑「秘苑」曾是朝鮮國王與王妃休養沉思的私家皇家園林，池畔蓮花與古木參天，幽靜深遠。",
        "tips": "🎫 秘苑預約：昌德宮後苑必須參加導覽梯次方可入內，官方網站提前開放中文或外語場次預約，名額有限務必提早上網搶訂！",
        "naverQuery": "창덕궁 후원",
        "googleQuery": "Changdeokgung Secret Garden",
        "completed": false,
        "note": ""
      },
      {
        "id": "d3-s5",
        "name": "廣藏市場 (夜市小吃美食巡禮)",
        "nameKr": "광장시장",
        "type": "food",
        "typeName": "傳統市集",
        "time": "18:00 晚餐",
        "transitNotice": null,
        "desc": "首爾歷史最悠久的傳統市集之一，充滿道地熱騰騰的人間煙火氣。坐在攤位木板凳上，親眼看阿珠媽現煎金黃香脆的綠豆煎餅，令人食指大動！",
        "tips": "😋 必吃推薦：順熙家綠豆煎餅 (빈대떡)、富村生牛肉配活章魚 (米其林推薦)、元祖鮪魚起司裸飯捲 (마약김밥)、現炸糯米麻花捲 (꽈배기)！",
        "naverQuery": "광장시장",
        "googleQuery": "Gwangjang Market",
        "completed": false,
        "note": ""
      }
    ]
  },
  {
    "day": 4,
    "title": "第四天：江南現代時尚新地標 ＆ 潮流聖水洞 ＆ 東大門玩具街與特色小吃",
    "dateHint": "Day 4",
    "summary": "造訪震撼視覺的「Coex 星空圖書館」，中午品嚐米其林推薦「Boreumsae」頂級熟成韓牛料理；下午探索潮流核心「聖水洞」咖啡街與概念店，傍晚尋訪「昌信洞文具玩具街」趣味挖寶，夜宿前漫遊東大門大啖特色小吃！",
    "bannerImg": "coex.jpg",
    "bannerCaption": "江南地標 · Coex Mall 星空圖書館",
    "spots": [
      {
        "id": "d4-s1",
        "name": "COEX 星空圖書館 (Starfield Library)",
        "nameKr": "별마당 도서관 (스타필드 코엑스몰)",
        "type": "attraction",
        "typeName": "網美打卡名勝",
        "time": "10:30 上午",
        "transitNotice": null,
        "desc": "位於首爾三成站 Coex Mall 內部的挑高巨型開放式圖書館。高達 13 公尺的震撼書架、自然灑落的天井採光以及藏書逾五萬冊的壯觀空間，是首爾最具辨識度的現代文化地標。",
        "tips": "📚 拍照角度：搭乘一樓通往二樓的手扶梯往上拍攝全景最為壯麗；館內座椅提供充電插座，氛圍悠閒愜意。",
        "naverQuery": "별마당 도서관",
        "googleQuery": "Starfield Library COEX",
        "completed": false,
        "note": ""
      },
      {
        "id": "d4-s2",
        "name": "中餐：Boreumsae (보름쇠 · 米其林推薦濟州黑韓牛料理)",
        "nameKr": "보름쇠 (Boreumsae)",
        "type": "food",
        "typeName": "米其林推薦",
        "time": "12:30 午餐",
        "transitNotice": null,
        "desc": "【新版指定美食】連續多年榮獲米其林指南推薦的頂級韓牛名店，位於三成站 COEX 旁步行約 5 分鐘。店家堅持從濟州島自家牧場空運極品黑毛韓牛，經過 2,000 小時嚴格濕式熟成處理。午間特別提供高 CP 值的生牛肉拌飯 (육회비빔밥)、韓牛排骨湯等定食，亦可單點享受炭火現烤熟成韓牛！",
        "tips": "🥩 美味推薦：午間生牛肉拌飯肉質鮮嫩清甜毫無腥味；想吃烤肉可點選招牌特選羽下肉或里肌肉，在典雅靜謐的包廂環境中享受尊榮美味！",
        "naverQuery": "보름쇠",
        "googleQuery": "Boreumsae Seoul",
        "completed": false,
        "note": ""
      },
      {
        "id": "d4-s3",
        "name": "聖水洞潮流文創街 (首爾布魯克林)",
        "nameKr": "성수동 카페거리 & 팝업스토어",
        "type": "shopping",
        "typeName": "文青潮流新地標",
        "time": "14:30 下午",
        "transitNotice": null,
        "desc": "【新版行程重點】首爾當前最受年輕人與時尚圈追捧的聖地！由老舊工廠與製鞋作坊改造成的工業風藝文街區。匯聚了 DIOR 聖水概念館超美外觀、TAMBURINS 香氛旗艦店、ADER ERROR 奇幻太空旗艦展覽、大林倉庫藝文咖啡廳與無數快閃店 (Pop-up Store)。",
        "tips": "☕ 逛街指南：沿著聖水站 3 號或 4 號出口漫步；必喝大林倉庫或 Onion 工業風手沖咖啡，並可在各個品牌概念館盡情打卡拍照！",
        "naverQuery": "성수동 카페거리",
        "googleQuery": "Seongsu-dong Cafe Street",
        "completed": false,
        "note": ""
      },
      {
        "id": "d4-s4",
        "name": "昌信洞文具玩具街 (Changsin-dong Toy Street)",
        "nameKr": "창신동 문구완구거리",
        "type": "shopping",
        "typeName": "特色批發街",
        "time": "17:00 傍晚",
        "transitNotice": null,
        "desc": "【新版行程重點】首爾歷史悠久且規模最大的文具與玩具批發市場，位於東大門站 4 號出口旁。整條街匯聚上百家批發店家，滿街懸掛著巨型公仔、K-POP 應援小物、韓系文具、三麗鷗與各類玩具盲盒，價格比一般百貨專櫃便宜三到五成！",
        "tips": "🧸 挖寶提醒：店家多於 18:00-19:00 間打烊，建議下午傍晚及早抵達；店門口巨大的大猩猩或小熊玩偶是著名地標打卡點！",
        "naverQuery": "창신동 문구완구거리",
        "googleQuery": "Changsin-dong Stationery and Toy Street",
        "completed": false,
        "note": ""
      },
      {
        "id": "d4-s5",
        "name": "東大門商圈漫遊 ＆ 在地特色小吃",
        "nameKr": "동대문디자인플라자 (DDP) & 동대문 로컬 맛집",
        "type": "food",
        "typeName": "夜景與美食",
        "time": "18:30 晚間",
        "transitNotice": null,
        "desc": "漫步札哈·哈蒂設計的流線型外星飛船巨型建築「東大門設計廣場 (DDP)」，傍晚科技感點燈美不勝收。隨後深入探索東大門在地特色小吃，感受越夜越美麗的不夜城！",
        "tips": "🍲 在地小吃推薦：①「陳玉華老奶奶元祖一隻雞」(蒜香甘甜清燉全雞＋年糕)；② 昌信洞「元祖辛辣豬腳」(창신동 매운족발，炭香火辣超下酒)；③ 東大門獵奇辣炒年糕；④ DDP 周邊不夜城商圈路邊攤烤肉串與黑輪！",
        "naverQuery": "동대문디자인플라자",
        "googleQuery": "Dongdaemun Design Plaza",
        "completed": false,
        "note": ""
      }
    ]
  },
  {
    "day": 5,
    "title": "第五天：2026/11/01 (日) 梨大漫遊 ＆ 延南洞伴手禮 ➔ 仁川機場 T2 ✈️ 平安返台",
    "dateHint": "11/01 (日)",
    "summary": "弘大車站寄放行李後，前往美麗的「梨花女子大學」欣賞大峽谷建築與梨花牆；午餐在「梨大火飯」或「孔陵一隻雞」大快朵頤！下午前往「延南洞」林蔭道選購精緻伴手禮與文創小物。傍晚取行李搭乘 AREX 直達仁川機場第二航廈 (T2)，搭乘中華航空 CI163 滿載而歸！",
    "spots": [
      {
        "id": "d5-s1-luggage",
        "name": "弘大車站寄放行李 (或飯店寄存)",
        "nameKr": "홍대입구역 짐보관 / 호텔 체크아웃",
        "type": "transit",
        "typeName": "行李寄存",
        "time": "09:00 上午",
        "transitNotice": "🧳 寄存提醒：先妥善安置大件行李，輕鬆展開最後一天市區漫遊！",
        "desc": "【新版行程重點】早晨辦理飯店退房後，將大件行李寄存於住宿飯店櫃台，或使用弘大入口站內的 T-Luggage / 自助置物櫃。因下午將前往延南洞並直接搭 AREX 去機場，行李放在弘大最為省力！",
        "tips": "💡 寄放秘訣：地鐵弘大入口站內設有多處電子寄物櫃（支援信用卡與 T-money 付款），或可善用弘大 Travel Center 行李寄放服務。",
        "naverQuery": "홍대입구역 물품보관함",
        "googleQuery": "Hongik Univ Station Luggage Storage",
        "completed": false,
        "note": ""
      },
      {
        "id": "d5-s1",
        "name": "梨花女子大學 (梨大校園漫步)",
        "nameKr": "이화여자대학교",
        "type": "attraction",
        "typeName": "校園巡禮",
        "time": "10:00 - 11:30",
        "transitNotice": null,
        "desc": "韓國歷史最悠久的女子大學，以美麗的哥德式大講堂、入口處拍照必去的「梨花浮雕牆」，以及由法國建築大師多米尼克·佩羅設計的下沉式複合地下建築 (ECC 大峽谷) 聞名。",
        "tips": "🌸 拍照提示：校門口右側的白色梨花浮雕牆象徵帶來好運與福氣；沿著綠意坡道散步，感受首爾知名學府的優雅氣息。",
        "naverQuery": "이화여자대학교",
        "googleQuery": "Ewha Womans University",
        "completed": false,
        "note": ""
      },
      {
        "id": "d5-s2-food",
        "name": "中餐美食二選一：梨大火飯 OR 孔陵一隻雞",
        "nameKr": "이대 불밥 OR 공릉닭한마리 신촌점",
        "type": "food",
        "typeName": "特色中餐",
        "time": "11:45 - 13:00",
        "transitNotice": null,
        "desc": "【新版指定美食二選一】新村梨大商圈超人氣兩大經典美味，依今日口味隨心挑選：\\n【選項 A：梨大火飯 (이대 불밥)】\\n梨大學生私藏的高 CP 值平價火飯！微辣甜香的鍋底搭配雞肉或海鮮豬肉，附軟嫩韓式蒸蛋，最後由店員現場拌炒吸滿濃郁醬汁的起司海苔炒飯，鍋巴焦香撲鼻！\\n【選項 B：孔陵一隻雞 新村店 (공릉닭한마리)】\\n經典鮮甜原汁雞湯，嚴選鮮嫩幼雞搭配馬鈴薯、年糕與秘製蒜泥辣醬，最後務必加點刀削麵與濃郁海苔雞蛋粥做完美收尾！",
        "tips": "🍲 選擇指南：喜歡重口味與起司炒飯推薦「梨大火飯」；偏好清甜甘醇雞湯暖胃則首選「孔陵一隻雞」！兩間店皆步行可達。",
        "naverQuery": "공릉닭한마리 신촌점",
        "googleQuery": "Gongneung Dakhanmari Sinchon",
        "completed": false,
        "note": ""
      },
      {
        "id": "d5-s3-yeonnam",
        "name": "延南洞漫遊 (選購特色伴手禮 ＆ 甜點文創)",
        "nameKr": "연남동 경의선숲길 (선물 & 디저트 쇼핑)",
        "type": "shopping",
        "typeName": "伴手禮採購",
        "time": "13:30 - 15:30",
        "transitNotice": null,
        "desc": "【新版行程重點】緊鄰弘大入口站 3 號出口的「延南洞」，是首爾文青、設計師與手作甜點店的聚落。沿著綠意盎然的「京義線林蔭道 (延特羅公園)」，兩旁巷弄散落著獨立香氛小店、韓系文具選品店、飾品工作坊與超高顏值伴手禮點心店，是回國前選購獨一無二禮物的最佳秘境！",
        "tips": "🎁 伴手禮推薦：可購買延南洞手作費南雪、達克瓦茲甜點禮盒、韓系小眾香水香氛、文創插畫明信片與手工飾品；順便在街角露天咖啡廳享受首爾午後愜意時光。",
        "naverQuery": "연남동 경의선숲길",
        "googleQuery": "Yeonnam-dong Gyeongui Line Forest Park",
        "completed": false,
        "note": ""
      },
      {
        "id": "d5-s3",
        "name": "弘大取行李 ＆ 搭乘 AREX 前往仁川機場 T2",
        "nameKr": "홍대입구역 ➔ 인천공항2터미널 공항철도",
        "type": "transit",
        "typeName": "機場交通",
        "time": "16:00 - 17:15",
        "transitNotice": "⏱️ 車程提醒：弘大至仁川第二航廈約 58 分鐘",
        "desc": "返回弘大住宿或置物櫃取出行李，於弘大入口站搭乘 AREX 機場鐵路普通列車前往仁川機場「第二航廈 (Terminal 2)」。",
        "tips": "⚠️ 航廈絕對注意：中華航空在「第二航廈 (T2)」！請勿在第一航廈提前下車，列車到終點站即為第二航廈！",
        "naverQuery": "인천국제공항 제2여객터미널",
        "googleQuery": "Incheon International Airport Terminal 2",
        "completed": false,
        "note": "弘大出發，目的地：仁川機場第二航廈 (T2)"
      },
      {
        "id": "d5-s4",
        "name": "仁川機場第二航廈 (T2) 退稅手續 ＆ 登機報到",
        "nameKr": "인천공항 T2 택스리펀 & 탑승수속",
        "type": "transit",
        "typeName": "機場退稅與手續",
        "time": "17:15 - 19:30",
        "transitNotice": "✈️ 起飛前 3 小時抵達 T2 報到託運（每人 1 件 23KG）",
        "desc": "抵達仁川機場 T2，先至退稅機台 (Tax Refund Kiosk) 刷護照與市區退稅單。至中華航空櫃台辦理 CI163 登機證領取與行李託運（每人限額 1 件 23KG），通過安檢與證照查驗後至 249/253 號登機門旁退稅櫃台領取韓元退稅現金或信用卡退稅。",
        "tips": "🛍️ 機場免稅：仁川 T2 免稅店寬敞好逛，登機前可做最後的免稅菸酒零食採買，並請於 19:45 前抵達登機門候機。",
        "naverQuery": "인천국제공항 제2여객터미널",
        "googleQuery": "Incheon Airport Terminal 2 Tax Refund",
        "completed": false,
        "note": "華航 CI163，仁川 T2 起飛"
      },
      {
        "id": "d5-s5",
        "name": "中華航空 CI163 航班（首爾仁川 ✈️ 台北桃園）",
        "nameKr": "중화항공 CI163 (ICN T2 ➔ TPE T1)",
        "type": "transit",
        "typeName": "返程航班",
        "time": "20:15 - 22:15",
        "transitNotice": "🛬 航班抵達：首爾仁川 T2 (20:15) ➔ 台北桃園 T1 (22:15)",
        "desc": "20:15 仁川國際機場 T2 起飛，直飛飛行時間約 3 小時，於台灣時間 22:15 平安降落台北桃園國際機場第一航廈 (T1)。出關提領行李，搭乘機場捷運或專車平安返家，圓滿結束 5 天 4 夜韓國行！",
        "tips": "🏠 抵達台灣：桃園機場第一航廈 (T1)，通過移民署自動通關與海關檢查，領取託運行李。",
        "naverQuery": "인천국제공항 제2여객터미널 탑승구",
        "googleQuery": "Taoyuan International Airport Terminal 1",
        "completed": false,
        "note": "降落桃園機場 T1 (22:15)"
      }
    ]
  }
];

// Pre-defined packing items
const defaultPackingList = [
  { id: "pk-1", text: "護照正本（有效期限需大於 6 個月）", done: false },
  { id: "pk-2", text: "韓國 220V 兩孔圓頭規格轉接插頭", done: false },
  { id: "pk-3", text: "WOWPASS 儲值卡 / T-money 交通卡", done: false },
  { id: "pk-4", text: "韓國 5G 上網 eSIM / 實體 SIM 卡（確認漫遊設定）", done: false },
  { id: "pk-5", text: "海外高回饋信用卡 ＆ 備用少許美金/新台幣現鈔", done: false },
  { id: "pk-6", text: "填寫 Q-CODE 健康申報碼 (或機上填紙本黃卡)", done: false },
  { id: "pk-7", text: "行動電源隨身攜帶（禁止放托運行李）", done: false },
  { id: "pk-8", text: "個人常備藥品（腸胃藥、感冒止痛、止暈藥）", done: false },
  { id: "pk-9", text: "好穿好走的運動鞋（首爾步行步數常破萬）", done: false },
  { id: "pk-10", text: "手機下載 Naver Map 韓文地圖 App (避免 Google Maps 導航受限)", done: false }
];

// Essential Korean Travel Phrases
const survivalPhrases = [
  {
    cn: "你好 / 您好",
    kr: "안녕하세요",
    roman: "An-nyeong-ha-se-yo",
    category: "問候"
  },
  {
    cn: "謝謝您",
    kr: "감사합니다",
    roman: "Gam-sa-ham-ni-da",
    category: "禮貌"
  },
  {
    cn: "請給我菜單",
    kr: "메뉴판 주세요",
    roman: "Me-nyu-pan ju-se-yo",
    category: "餐廳點餐"
  },
  {
    cn: "請給我水",
    kr: "물 좀 주세요",
    roman: "Mul jom ju-se-yo",
    category: "餐廳用餐"
  },
  {
    cn: "可以外帶嗎？",
    kr: "포장돼요?",
    roman: "Po-jang-dwae-yo?",
    category: "餐廳點餐"
  },
  {
    cn: "請幫我結帳 / 買單",
    kr: "계산해 주세요",
    roman: "Gye-san-hae ju-se-yo",
    category: "購物結帳"
  },
  {
    cn: "這個多少錢？",
    kr: "이거 얼마예요?",
    roman: "I-geo eol-ma-ye-yo?",
    category: "購物結帳"
  },
  {
    cn: "這個小卡多少錢？",
    kr: "이 포카 얼마예요?",
    roman: "I po-ka eol-ma-ye-yo?",
    category: "購物結帳"
  },
  {
    cn: "可以刷卡嗎？",
    kr: "카드 돼요?",
    roman: "Ka-deu dwae-yo?",
    category: "付款"
  },
  {
    cn: "請微辣 / 不要太辣",
    kr: "덜 맵게 해주세요",
    roman: "Deol maep-ge hae-ju-se-yo",
    category: "餐廳點餐"
  },
  {
    cn: "不好意思 / 借過一下",
    kr: "죄송합니다 / 실례합니다",
    roman: "Joe-song-ham-ni-da",
    category: "日常"
  },
  {
    cn: "洗手間在哪裡？",
    kr: "화장실이 어디예요?",
    roman: "Hwa-jang-sil-i eo-di-ye-yo?",
    category: "問路"
  },
  {
    cn: "地鐵站在哪裡？",
    kr: "지하철역이 어디예요?",
    roman: "Ji-ha-cheol-yeok-i eo-di-ye-yo?",
    category: "交通"
  }
];

// App State Management
class TravelApp {
  constructor() {
    this.storageKey = "seoul_travel_itinerary_v5";
    this.packingKey = "seoul_packing_list_v1";
    this.rateKey = "seoul_currency_rate_v1";
    this.themeKey = "seoul_theme_mode_v1";

    // Clean up older cached data containing any private booking information
    try {
      localStorage.removeItem("seoul_travel_itinerary_v1");
      localStorage.removeItem("seoul_travel_itinerary_v2");
      localStorage.removeItem("seoul_travel_itinerary_v3");
      localStorage.removeItem("seoul_travel_itinerary_v4");
    } catch(e) {}

    this.activeDay = 0; // 0 means all days, 1..5 for specific day
    this.exchangeRate = parseFloat(localStorage.getItem(this.rateKey)) || 41.5; // 1 TWD = 41.5 KRW
    this.itinerary = this.loadItinerary();
    this.packingList = this.loadPackingList();

    this.initElements();
    this.initTheme();
    this.initEventListeners();
    this.render();
  }

  loadItinerary() {
    try {
      const saved = localStorage.getItem(this.storageKey);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.warn("Failed to load itinerary from localStorage", e);
    }
    return JSON.parse(JSON.stringify(defaultItinerary));
  }

  saveItinerary() {
    localStorage.setItem(this.storageKey, JSON.stringify(this.itinerary));
    this.updateStats();
  }

  loadPackingList() {
    try {
      const saved = localStorage.getItem(this.packingKey);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.warn("Failed to load packing list", e);
    }
    return JSON.parse(JSON.stringify(defaultPackingList));
  }

  savePackingList() {
    localStorage.setItem(this.packingKey, JSON.stringify(this.packingList));
  }

  initElements() {
    this.dayTabsContainer = document.getElementById("day-tabs");
    this.itineraryContainer = document.getElementById("itinerary-content");
    this.statSpotsCount = document.getElementById("stat-spots-count");
    this.statProgressText = document.getElementById("stat-progress-text");
    this.statProgressBar = document.getElementById("stat-progress-bar");
    this.themeToggleBtn = document.getElementById("theme-toggle-btn");

    // Currency elements
    this.krwInput = document.getElementById("calc-krw");
    this.twdInput = document.getElementById("calc-twd");
    this.rateDisplay = document.getElementById("rate-display");
    this.rateEditLink = document.getElementById("rate-edit-link");

    // Modal elements
    this.modalBackdrop = document.getElementById("modal-backdrop");
    this.modalTitle = document.getElementById("modal-title");
    this.modalBody = document.getElementById("modal-body");
    this.modalFooter = document.getElementById("modal-footer");
    this.modalCloseBtn = document.getElementById("modal-close-btn");

    // Quick toolbar buttons
    this.btnOpenFlight = document.getElementById("btn-open-flight");
    this.btnOpenPacking = document.getElementById("btn-open-packing");
    this.btnOpenPhrases = document.getElementById("btn-open-phrases");
    this.btnOpenTransit = document.getElementById("btn-open-transit");
    this.btnPrintPlan = document.getElementById("btn-print-plan");
    this.btnResetPlan = document.getElementById("btn-reset-plan");
  }

  initTheme() {
    const savedTheme = localStorage.getItem(this.themeKey);
    if (savedTheme === "dark") {
      document.documentElement.setAttribute("data-theme", "dark");
      this.themeToggleBtn.textContent = "☀️";
    } else {
      document.documentElement.removeAttribute("data-theme");
      this.themeToggleBtn.textContent = "🌙";
    }
  }

  toggleTheme() {
    const isDark = document.documentElement.getAttribute("data-theme") === "dark";
    if (isDark) {
      document.documentElement.removeAttribute("data-theme");
      localStorage.setItem(this.themeKey, "light");
      this.themeToggleBtn.textContent = "🌙";
    } else {
      document.documentElement.setAttribute("data-theme", "dark");
      localStorage.setItem(this.themeKey, "dark");
      this.themeToggleBtn.textContent = "☀️";
    }
  }

  initEventListeners() {
    // Theme toggle
    this.themeToggleBtn.addEventListener("click", () => this.toggleTheme());

    // Currency converter logic
    this.krwInput.addEventListener("input", (e) => {
      const krw = parseFloat(e.target.value);
      if (!isNaN(krw)) {
        const twd = Math.round(krw / this.exchangeRate);
        this.twdInput.value = twd;
      } else {
        this.twdInput.value = "";
      }
    });

    this.twdInput.addEventListener("input", (e) => {
      const twd = parseFloat(e.target.value);
      if (!isNaN(twd)) {
        const krw = Math.round(twd * this.exchangeRate);
        this.krwInput.value = krw;
      } else {
        this.krwInput.value = "";
      }
    });

    this.rateEditLink.addEventListener("click", () => {
      const newRate = prompt("請輸入自訂匯率（1 台幣可兌換多少韓元）：", this.exchangeRate);
      if (newRate && !isNaN(parseFloat(newRate)) && parseFloat(newRate) > 0) {
        this.exchangeRate = parseFloat(newRate);
        localStorage.setItem(this.rateKey, this.exchangeRate);
        this.updateRateDisplay();
        // Recalculate
        if (this.krwInput.value) {
          this.twdInput.value = Math.round(parseFloat(this.krwInput.value) / this.exchangeRate);
        }
      }
    });

    // Modal Close
    this.modalCloseBtn.addEventListener("click", () => this.closeModal());
    this.modalBackdrop.addEventListener("click", (e) => {
      if (e.target === this.modalBackdrop) this.closeModal();
    });

    // Toolbar triggers
    if (this.btnOpenFlight) this.btnOpenFlight.addEventListener("click", () => this.openFlightModal());
    this.btnOpenPacking.addEventListener("click", () => this.openPackingModal());
    this.btnOpenPhrases.addEventListener("click", () => this.openPhrasesModal());
    this.btnOpenTransit.addEventListener("click", () => this.openTransitModal());
    this.btnPrintPlan.addEventListener("click", () => window.print());
    this.btnResetPlan.addEventListener("click", () => {
      if (confirm("確定要將行程重置為初始推薦狀態嗎？自訂的打勾與筆記將會被恢復。")) {
        localStorage.removeItem(this.storageKey);
        this.itinerary = JSON.parse(JSON.stringify(defaultItinerary));
        this.render();
      }
    });

    // Mobile Bottom Dock Triggers
    const dockFlight = document.getElementById("dock-btn-flight");
    const dockPacking = document.getElementById("dock-btn-packing");
    const dockPhrases = document.getElementById("dock-btn-phrases");
    const dockTransit = document.getElementById("dock-btn-transit");
    const dockTop = document.getElementById("dock-btn-top");

    if (dockFlight) dockFlight.addEventListener("click", () => this.openFlightModal());
    if (dockPacking) dockPacking.addEventListener("click", () => this.openPackingModal());
    if (dockPhrases) dockPhrases.addEventListener("click", () => this.openPhrasesModal());
    if (dockTransit) dockTransit.addEventListener("click", () => this.openTransitModal());
    if (dockTop) dockTop.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));

    this.updateRateDisplay();
  }

  // Flight E-Ticket Modal
  openFlightModal() {
    const html = `
      <div style="font-size: 0.92rem; line-height: 1.6; color: var(--text-main);">
        <div style="background: var(--bg-main); padding: 14px 16px; border-radius: var(--radius-md); border: 1px solid var(--border); margin-bottom: 16px; display:flex; justify-content:space-between; align-items:center;">
          <span>航空公司：<strong>${flightData.airline}</strong></span>
          <span style="background:rgba(42, 157, 143, 0.15); color:#0F766E; font-weight:700; padding:3px 10px; border-radius:var(--radius-full); font-size:0.8rem;">狀態：已確認 (Confirmed)</span>
        </div>

        <div style="margin-bottom: 16px; border: 1px solid var(--border); border-radius: var(--radius-md); padding: 14px;">
          <h4 style="color: #0F766E; margin-bottom: 6px; display:flex; align-items:center; gap:6px;">
            🛫 去程航班 · ${flightData.outbound.flight} (${flightData.outbound.date})
          </h4>
          <p>• <b>航線</b>：${flightData.outbound.from} <b>${flightData.outbound.fromTerminal}</b> ➔ ${flightData.outbound.to} <b>${flightData.outbound.toTerminal}</b></p>
          <p>• <b>時間</b>：${flightData.outbound.depTime} 起飛 ➔ ${flightData.outbound.arrTime} 降落（飛行時間 ${flightData.outbound.duration}）</p>
          <p>• <b>行李額度</b>：免費託運 ${flightData.outbound.baggage}，手提 1 件 7kg</p>
        </div>

        <div style="margin-bottom: 16px; border: 1px solid var(--border); border-radius: var(--radius-md); padding: 14px;">
          <h4 style="color: #D32F2F; margin-bottom: 6px; display:flex; align-items:center; gap:6px;">
            🛬 回程航班 · ${flightData.inbound.flight} (${flightData.inbound.date})
          </h4>
          <p>• <b>航線</b>：${flightData.inbound.from} <b>${flightData.inbound.toTerminal}</b> ➔ ${flightData.inbound.to} <b>${flightData.inbound.toTerminal}</b></p>
          <p>• <b>時間</b>：${flightData.inbound.depTime} 起飛 ➔ ${flightData.inbound.arrTime} 降落（飛行時間 ${flightData.inbound.duration}）</p>
          <p>• <b>行李額度</b>：免費託運 ${flightData.inbound.baggage}，手提 1 件 7kg</p>
        </div>

        <div style="background: rgba(244, 162, 97, 0.15); border-left: 4px solid #F4A261; padding: 12px; border-radius: 4px; font-size: 0.84rem; color: #9C4221;">
          ⚠️ <b>航廈避雷重要提醒</b>：<br>
          1. 台北出發與抵達皆為<b>桃園國際機場第一航廈 (T1)</b>。<br>
          2. 首爾出發與抵達皆為<b>仁川國際機場第二航廈 (T2)</b>！搭乘 AREX 或巴士往返時切勿跑錯第一航廈。
        </div>
      </div>
    `;

    const footer = `
      <button class="btn-primary" id="btn-close-flight">我知道了</button>
    `;

    this.openModal("✈️ 中華航空航班行程詳情", html, footer);
    document.getElementById("btn-close-flight").addEventListener("click", () => this.closeModal());
  }

  updateRateDisplay() {
    this.rateDisplay.textContent = `當前試算匯率：1 TWD ≈ ${this.exchangeRate} KRW`;
  }

  openModal(title, bodyHtml, footerHtml = "") {
    this.modalTitle.innerHTML = title;
    this.modalBody.innerHTML = bodyHtml;
    this.modalFooter.innerHTML = footerHtml;
    this.modalBackdrop.classList.add("show");
    document.body.style.overflow = "hidden";
  }

  closeModal() {
    this.modalBackdrop.classList.remove("show");
    document.body.style.overflow = "";
  }

  render() {
    this.renderTabs();
    this.renderItinerary();
    this.updateStats();
  }

  renderTabs() {
    const days = [
      { id: 0, label: "全部行程", count: this.getAllSpots().length },
      ...this.itinerary.map(d => ({ id: d.day, label: `Day ${d.day}`, count: d.spots.length }))
    ];

    this.dayTabsContainer.innerHTML = days.map(tab => `
      <button class="day-tab-btn ${this.activeDay === tab.id ? 'active' : ''}" data-day="${tab.id}">
        <span>${tab.label}</span>
        <span class="tab-badge">${tab.count}</span>
      </button>
    `).join("");

    this.dayTabsContainer.querySelectorAll(".day-tab-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        this.activeDay = parseInt(btn.dataset.day, 10);
        this.renderTabs();
        this.renderItinerary();
      });
    });
  }

  getAllSpots() {
    let spots = [];
    this.itinerary.forEach(d => {
      spots = spots.concat(d.spots);
    });
    return spots;
  }

  updateStats() {
    const all = this.getAllSpots();
    const completed = all.filter(s => s.completed).length;
    const percent = all.length > 0 ? Math.round((completed / all.length) * 100) : 0;

    if (this.statSpotsCount) this.statSpotsCount.textContent = `${all.length} 個景點`;
    if (this.statProgressText) this.statProgressText.textContent = `${completed} / ${all.length} (${percent}%)`;
    if (this.statProgressBar) this.statProgressBar.style.width = `${percent}%`;
  }

  renderItinerary() {
    const daysToShow = this.activeDay === 0
      ? this.itinerary
      : this.itinerary.filter(d => d.day === this.activeDay);

    if (daysToShow.length === 0) {
      this.itineraryContainer.innerHTML = `<p style="text-align:center; padding: 40px; color: var(--text-muted);">暫無此天行程內容</p>`;
      return;
    }

    this.itineraryContainer.innerHTML = daysToShow.map(dayObj => this.renderDayBlock(dayObj)).join("");

    // Bind event listeners on spot cards
    this.bindSpotCardEvents();
  }

  renderDayBlock(dayObj) {
    const spotsHtml = dayObj.spots.map(spot => this.renderSpotCard(spot, dayObj.day)).join("");
    const bannerHtml = dayObj.bannerImg ? `
      <div class="day-visual-banner">
        <img src="${dayObj.bannerImg}" alt="${dayObj.title}" class="day-banner-img" loading="lazy">
        ${dayObj.bannerCaption ? `<span class="day-banner-tag">📸 ${dayObj.bannerCaption}</span>` : ''}
      </div>
    ` : '';

    // Generate Route Stepper Flow
    const routeChipsHtml = dayObj.spots.map((spot, idx) => {
      const shortTimeMatch = (spot.time || '').match(/(\d{1,2}:\d{2})/);
      const shortTime = shortTimeMatch ? shortTimeMatch[1] : (spot.time ? spot.time.split(' ')[0] : '');
      const arrow = idx < dayObj.spots.length - 1 ? `<span class="route-step-arrow">➔</span>` : '';
      return `
        <a href="#spot-card-${spot.id}" class="route-step-chip ${spot.completed ? 'completed' : ''}" data-target-spot="${spot.id}" title="${spot.time || ''} ${spot.name}">
          <span class="step-num">${idx + 1}</span>
          ${shortTime ? `<span class="step-time">${shortTime}</span>` : ''}
          <span class="step-name">${spot.name}</span>
        </a>
        ${arrow}
      `;
    }).join("");

    return `
      <div class="day-block" id="day-block-${dayObj.day}">
        <div class="day-header-card">
          <div class="day-title-wrap">
            <span class="day-title-tag">第 ${dayObj.day} 天行程</span>
            <h3>${dayObj.title}</h3>
            <p class="day-summary-text">${dayObj.summary}</p>
          </div>
          <div class="day-actions">
            <button class="btn-add-spot" data-add-day="${dayObj.day}">
              <span>➕ 新增景點</span>
            </button>
          </div>
        </div>

        <div class="day-route-flow">
          <div class="route-flow-header">
            <span class="route-flow-title">📍 當日精華動線全覽 (${dayObj.spots.length} 站)</span>
            <button class="btn-toggle-all-day" data-toggle-all="${dayObj.day}">
              展開今日全部攻略
            </button>
          </div>
          <div class="route-flow-steps">
            ${routeChipsHtml}
          </div>
        </div>

        ${bannerHtml}

        <div class="timeline-container">
          ${spotsHtml}
        </div>
      </div>
    `;
  }

  renderSpotCard(spot, dayNum) {
    const naverUrl = `https://map.naver.com/v5/search/${encodeURIComponent(spot.naverQuery || spot.nameKr || spot.name)}`;
    const googleUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(spot.googleQuery || spot.name)}`;

    const transitAlert = spot.transitNotice ? `
      <div class="transit-alert">
        <span class="transit-icon">🚌</span>
        <span>${spot.transitNotice}</span>
        <span class="transit-badge">交通提醒</span>
      </div>
    ` : '';

    return `
      ${transitAlert}
      <div class="spot-card ${spot.completed ? 'completed' : ''}" id="spot-card-${spot.id}" data-spot-id="${spot.id}" data-day="${dayNum}">
        <div class="spot-timeline-header">
          ${spot.time ? `
            <div class="spot-time-badge">
              <span class="time-icon">⏰</span>
              <span>${spot.time}</span>
            </div>
          ` : `
            <div class="spot-time-badge" style="background: var(--secondary);">
              <span class="time-icon">📌</span>
              <span>自由安排</span>
            </div>
          `}
          <span class="spot-type-tag ${spot.type}">${this.getTypeIcon(spot.type)} ${spot.typeName || '景點'}</span>
          <div class="spot-card-top-right">
            <button class="spot-check-btn" title="標記為已造訪 / 完成" data-check-id="${spot.id}">
              ${spot.completed ? '✓' : '○'}
            </button>
          </div>
        </div>

        <div class="spot-title-area">
          <h4 class="spot-main-name">${spot.name}</h4>
          ${spot.nameKr ? `<span class="spot-kr-name">${spot.nameKr}</span>` : ''}
        </div>

        <div class="spot-quick-actions">
          <a href="${naverUrl}" target="_blank" rel="noopener noreferrer" class="btn-map-action btn-naver">
            🟢 Naver 導航
          </a>
          <a href="${googleUrl}" target="_blank" rel="noopener noreferrer" class="btn-map-action btn-google-map">
            📍 Google Maps
          </a>
          <button class="btn-toggle-detail" data-toggle-id="${spot.id}">
            <span>📖 攻略與詳情</span>
            <span class="toggle-arrow">▾</span>
          </button>
        </div>

        <div class="spot-collapsible-detail" id="detail-${spot.id}">
          <p class="spot-desc">${spot.desc}</p>
          
          ${spot.tips ? `
            <div class="spot-tip-box">
              <span class="tip-icon">💡</span>
              <span class="tip-content">${spot.tips}</span>
            </div>
          ` : ''}

          ${spot.note ? `
            <div class="spot-user-note">
              <span>📌 備忘：${this.escapeHtml(spot.note)}</span>
              <button class="btn-note" style="padding: 2px 6px;" data-edit-note="${spot.id}">✏️ 編輯</button>
            </div>
          ` : ''}

          <div class="spot-sub-actions">
            <button class="btn-note" data-add-note="${spot.id}">
              ${spot.note ? '📝 修改備忘' : '➕ 加筆記'}
            </button>
            <button class="btn-note" style="color: #EF4444; margin-left: auto;" data-delete-spot="${spot.id}">
              🗑️ 移除
            </button>
          </div>
        </div>
      </div>
    `;
  }

  getTypeIcon(type) {
    switch (type) {
      case 'food': return '🍜';
      case 'shopping': return '🛍️';
      case 'hotel': return '🏨';
      case 'transit': return '🚌';
      case 'attraction':
      default: return '🏛️';
    }
  }

  bindSpotCardEvents() {
    // Check buttons
    this.itineraryContainer.querySelectorAll(".spot-check-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        const spotId = btn.dataset.checkId;
        this.toggleSpotCompleted(spotId);
      });
    });

    // Notes buttons
    this.itineraryContainer.querySelectorAll("[data-add-note], [data-edit-note]").forEach(btn => {
      btn.addEventListener("click", () => {
        const spotId = btn.dataset.addNote || btn.dataset.editNote;
        this.promptNoteEdit(spotId);
      });
    });

    // Delete spot
    this.itineraryContainer.querySelectorAll("[data-delete-spot]").forEach(btn => {
      btn.addEventListener("click", () => {
        const spotId = btn.dataset.deleteSpot;
        if (confirm("確定要將此景點從行程中移除嗎？")) {
          this.deleteSpot(spotId);
        }
      });
    });

    // Add spot buttons in day header
    this.itineraryContainer.querySelectorAll("[data-add-day]").forEach(btn => {
      btn.addEventListener("click", () => {
        const dayNum = parseInt(btn.dataset.addDay, 10);
        this.openAddSpotModal(dayNum);
      });
    });

    // Single spot collapsible detail toggle
    this.itineraryContainer.querySelectorAll("[data-toggle-id]").forEach(btn => {
      btn.addEventListener("click", () => {
        const spotId = btn.dataset.toggleId;
        const detailEl = document.getElementById(`detail-${spotId}`);
        if (detailEl) {
          const isOpen = detailEl.classList.toggle("is-open");
          btn.classList.toggle("is-open", isOpen);
        }
      });
    });

    // Day level toggle all details
    this.itineraryContainer.querySelectorAll("[data-toggle-all]").forEach(btn => {
      btn.addEventListener("click", () => {
        const dayNum = btn.dataset.toggleAll;
        const dayBlock = document.getElementById(`day-block-${dayNum}`);
        if (!dayBlock) return;
        const details = dayBlock.querySelectorAll(".spot-collapsible-detail");
        const toggleBtns = dayBlock.querySelectorAll(".btn-toggle-detail");
        const isAnyClosed = Array.from(details).some(d => !d.classList.contains("is-open"));

        details.forEach(d => d.classList.toggle("is-open", isAnyClosed));
        toggleBtns.forEach(b => b.classList.toggle("is-open", isAnyClosed));
        btn.textContent = isAnyClosed ? "收合今日全部攻略" : "展開今日全部攻略";
      });
    });

    // Route chip smooth scroll & focus highlight
    this.itineraryContainer.querySelectorAll("[data-target-spot]").forEach(chip => {
      chip.addEventListener("click", (e) => {
        e.preventDefault();
        const spotId = chip.dataset.targetSpot;
        const card = document.getElementById(`spot-card-${spotId}`);
        if (card) {
          card.scrollIntoView({ behavior: "smooth", block: "center" });
          card.style.outline = "2px solid var(--primary)";
          setTimeout(() => {
            card.style.outline = "";
          }, 1500);
        }
      });
    });
  }

  toggleSpotCompleted(spotId) {
    for (const day of this.itinerary) {
      const spot = day.spots.find(s => s.id === spotId);
      if (spot) {
        spot.completed = !spot.completed;
        this.saveItinerary();
        this.renderItinerary();
        break;
      }
    }
  }

  promptNoteEdit(spotId) {
    for (const day of this.itinerary) {
      const spot = day.spots.find(s => s.id === spotId);
      if (spot) {
        const newNote = prompt(`請輸入「${spot.name}」的個人備忘或提醒事項：`, spot.note || "");
        if (newNote !== null) {
          spot.note = newNote.trim();
          this.saveItinerary();
          this.renderItinerary();
        }
        break;
      }
    }
  }

  deleteSpot(spotId) {
    for (const day of this.itinerary) {
      const idx = day.spots.findIndex(s => s.id === spotId);
      if (idx !== -1) {
        day.spots.splice(idx, 1);
        this.saveItinerary();
        this.render();
        break;
      }
    }
  }

  openAddSpotModal(targetDay) {
    const html = `
      <form id="add-spot-form">
        <div class="form-group">
          <label for="new-spot-day">安排在哪一天？</label>
          <select id="new-spot-day" class="form-select">
            ${this.itinerary.map(d => `
              <option value="${d.day}" ${d.day === targetDay ? 'selected' : ''}>Day ${d.day} - ${d.title}</option>
            `).join("")}
          </select>
        </div>

        <div class="form-group">
          <label for="new-spot-name">景點 / 餐廳名稱（必填）*</label>
          <input type="text" id="new-spot-name" class="form-input" placeholder="例如：廣藏市場生牛肉、漢江公園野餐" required />
        </div>

        <div class="form-group">
          <label for="new-spot-kr">韓文名稱（方便 Naver Map 導航與問路）</label>
          <input type="text" id="new-spot-kr" class="form-input" placeholder="例如：한강공원" />
        </div>

        <div class="form-group">
          <label for="new-spot-type">類型分類</label>
          <select id="new-spot-type" class="form-select">
            <option value="attraction">🏛️ 觀光景點</option>
            <option value="food">🍜 必吃美食</option>
            <option value="shopping">🛍️ 逛街購物</option>
            <option value="hotel">🏨 飯店住宿</option>
            <option value="transit">🚌 交通轉乘</option>
          </select>
        </div>

        <div class="form-group">
          <label for="new-spot-time">預計時間</label>
          <input type="text" id="new-spot-time" class="form-input" placeholder="例如：14:00 下午" />
        </div>

        <div class="form-group">
          <label for="new-spot-desc">景點說明與重點備註</label>
          <textarea id="new-spot-desc" class="form-textarea" placeholder="特色、營業時間、必點菜色等..."></textarea>
        </div>
      </form>
    `;

    const footer = `
      <button class="btn-secondary" id="btn-cancel-add">取消</button>
      <button class="btn-primary" id="btn-submit-add">確定新增</button>
    `;

    this.openModal("➕ 新增行程景點", html, footer);

    document.getElementById("btn-cancel-add").addEventListener("click", () => this.closeModal());
    document.getElementById("btn-submit-add").addEventListener("click", () => {
      const name = document.getElementById("new-spot-name").value.trim();
      if (!name) {
        alert("請輸入景點名稱！");
        return;
      }

      const dayNum = parseInt(document.getElementById("new-spot-day").value, 10);
      const nameKr = document.getElementById("new-spot-kr").value.trim();
      const type = document.getElementById("new-spot-type").value;
      const time = document.getElementById("new-spot-time").value.trim();
      const desc = document.getElementById("new-spot-desc").value.trim();

      const targetDayObj = this.itinerary.find(d => d.day === dayNum);
      if (targetDayObj) {
        const newSpot = {
          id: `custom-${Date.now()}`,
          name: name,
          nameKr: nameKr,
          type: type,
          typeName: this.getTypeName(type),
          time: time || "自訂時間",
          desc: desc || "自訂新增之旅遊景點",
          tips: "",
          naverQuery: nameKr || name,
          googleQuery: `${name} Seoul`,
          completed: false,
          note: ""
        };

        targetDayObj.spots.push(newSpot);
        this.saveItinerary();
        this.closeModal();
        this.render();
      }
    });
  }

  getTypeName(type) {
    switch (type) {
      case 'food': return '必吃美食';
      case 'shopping': return '逛街購物';
      case 'hotel': return '住宿飯店';
      case 'transit': return '交通移動';
      case 'attraction':
      default: return '觀光名勝';
    }
  }

  // Packing Checklist Modal
  openPackingModal() {
    const renderList = () => {
      const itemsHtml = this.packingList.map((item, index) => `
        <div class="check-item ${item.done ? 'done' : ''}" data-idx="${index}">
          <input type="checkbox" ${item.done ? 'checked' : ''} data-check-idx="${index}" />
          <span style="flex: 1;">${this.escapeHtml(item.text)}</span>
          <button class="btn-note" style="color: #94A3B8; padding: 2px 6px;" data-del-packing="${index}">✕</button>
        </div>
      `).join("");

      return `
        <div style="margin-bottom: 16px;">
          <p style="font-size: 0.88rem; color: var(--text-muted); margin-bottom: 12px;">
            出發韓國行前檢查！出發前逐項確認打勾，狀態會自動儲存在手機/瀏覽器中。
          </p>
          <div id="packing-items-wrap">
            ${itemsHtml}
          </div>
        </div>
        <div style="display: flex; gap: 8px; margin-top: 16px;">
          <input type="text" id="new-pack-input" class="form-input" placeholder="新增個人必帶物品..." />
          <button class="btn-primary" id="btn-add-pack-item" style="white-space: nowrap;">新增</button>
        </div>
      `;
    };

    const footer = `
      <button class="btn-secondary" id="btn-close-packing">關閉</button>
    `;

    this.openModal("🎒 行前必備行李檢查清單", renderList(), footer);

    const bindPackingEvents = () => {
      const body = document.getElementById("packing-items-wrap");
      if (!body) return;

      body.querySelectorAll("input[type='checkbox']").forEach(cb => {
        cb.addEventListener("change", (e) => {
          const idx = parseInt(e.target.dataset.checkIdx, 10);
          this.packingList[idx].done = e.target.checked;
          this.savePackingList();
          this.openPackingModal();
        });
      });

      body.querySelectorAll("[data-del-packing]").forEach(btn => {
        btn.addEventListener("click", (e) => {
          e.stopPropagation();
          const idx = parseInt(btn.dataset.delPacking, 10);
          this.packingList.splice(idx, 1);
          this.savePackingList();
          this.openPackingModal();
        });
      });

      const addBtn = document.getElementById("btn-add-pack-item");
      const addInput = document.getElementById("new-pack-input");
      if (addBtn && addInput) {
        addBtn.addEventListener("click", () => {
          const val = addInput.value.trim();
          if (val) {
            this.packingList.push({ id: `pk-${Date.now()}`, text: val, done: false });
            this.savePackingList();
            this.openPackingModal();
          }
        });
        addInput.addEventListener("keypress", (e) => {
          if (e.key === "Enter") addBtn.click();
        });
      }

      document.getElementById("btn-close-packing").addEventListener("click", () => this.closeModal());
    };

    bindPackingEvents();
  }

  // Survival Korean Phrases Modal
  openPhrasesModal() {
    const phrasesHtml = survivalPhrases.map(phrase => `
      <div class="phrase-card">
        <div class="phrase-info">
          <h4>${phrase.cn} <span style="font-size: 0.75rem; color: var(--text-muted); font-weight: normal;">(${phrase.category})</span></h4>
          <div class="phrase-kr">${phrase.kr}</div>
          <div class="phrase-roman">發音：${phrase.roman}</div>
        </div>
        <button class="btn-speak" title="點擊聆聽韓語發音" data-speech="${phrase.kr}">
          🔊
        </button>
      </div>
    `).join("");

    const html = `
      <p style="font-size: 0.88rem; color: var(--text-muted); margin-bottom: 16px;">
        點擊右側喇叭按鈕即可直接發音！在餐廳點菜、結帳或問路時超級好用。
      </p>
      <div class="phrases-list">
        ${phrasesHtml}
      </div>
    `;

    const footer = `
      <button class="btn-primary" id="btn-close-phrase">完成</button>
    `;

    this.openModal("🗣️ 韓國自由行實用生存韓語", html, footer);

    document.querySelectorAll(".btn-speak").forEach(btn => {
      btn.addEventListener("click", () => {
        const text = btn.dataset.speech;
        this.speakKorean(text);
      });
    });

    document.getElementById("btn-close-phrase").addEventListener("click", () => this.closeModal());
  }

  speakKorean(text) {
    if (!('speechSynthesis' in window)) {
      alert("您的瀏覽器暫不支援語音合成發音。");
      return;
    }
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "ko-KR";
    utterance.rate = 0.9; // Slightly slower for clear learning
    window.speechSynthesis.speak(utterance);
  }

  // Seoul Transit Guide Modal
  openTransitModal() {
    const html = `
      <div style="font-size: 0.9rem; line-height: 1.7; color: var(--text-main);">
        <div style="margin-bottom: 18px; padding-bottom: 14px; border-bottom: 1px solid var(--border);">
          <h4 style="font-size: 1rem; color: var(--primary); margin-bottom: 6px;">🚇 1. 必載導航與交通 App</h4>
          <p>• <b>Naver Map (必裝)</b>：韓國因國防法規，Google Maps 步行路線不精準。Naver Map 支援簡體/繁體中文搜尋，公車地鐵極度精確！</p>
          <p>• <b>Subway Korea</b>：繁體中文首爾地鐵路線圖與到站換乘導航，離線也能查詢。</p>
          <p>• <b>Kakao T</b>：韓國最大計程車叫車 App，免去路邊招車溝通困難。</p>
        </div>

        <div style="margin-bottom: 18px; padding-bottom: 14px; border-bottom: 1px solid var(--border);">
          <h4 style="font-size: 1rem; color: var(--primary); margin-bottom: 6px;">🚆 2. 弘大 ⇄ 仁川機場交通 (AREX)</h4>
          <p>• 弘大入口站 (Hongik Univ.) 直通 AREX 機場鐵路「普通列車」(All-Stop Train)，無需在首爾站轉車，車程約 53 分鐘直達仁川機場，票價便宜且班次密集。</p>
          <p>• 若搭乘「直通列車 (Express Train)」，需至首爾站搭乘。</p>
        </div>

        <div style="margin-bottom: 18px; padding-bottom: 14px; border-bottom: 1px solid var(--border);">
          <h4 style="font-size: 1rem; color: var(--primary); margin-bottom: 6px;">🌲 3. 南怡島 & 加平交通技巧</h4>
          <p>• 弘大搭 2 號線至往十里站轉乘京春線，或至龍山/清涼里站轉乘 <b>ITX-青春號</b> 至加平站 (約 55 分鐘)。</p>
          <p>• 加平站出站後可搭乘「加平觀光循環巴士」一日券，串聯南怡島、小法國村、晨靜樹木園，上車向司機購買即可！</p>
        </div>

        <div>
          <h4 style="font-size: 1rem; color: var(--primary); margin-bottom: 6px;">💳 4. 支付與退稅 (Tax Refund)</h4>
          <p>• <b>WOWPASS 卡</b>：可在地鐵站機台以新台幣現鈔直接換匯存入卡片，兼具簽帳金融卡與 T-money 交通卡雙重功能，全韓國商店皆可刷。</p>
          <p>• <b>即時退稅</b>：大型量販店 (樂天超市、Olive Young) 單筆滿 15,000 韓元出示護照即可現場折抵消費稅。</p>
        </div>
      </div>
    `;

    const footer = `
      <button class="btn-primary" id="btn-close-transit">了解</button>
    `;

    this.openModal("🚇 首爾自由行實用交通指南", html, footer);
    document.getElementById("btn-close-transit").addEventListener("click", () => this.closeModal());
  }

  escapeHtml(str) {
    if (!str) return "";
    return str.replace(/[&<>"']/g, function (m) {
      switch (m) {
        case '&': return '&amp;';
        case '<': return '&lt;';
        case '>': return '&gt;';
        case '"': return '&quot;';
        case "'": return '&#39;';
        default: return m;
      }
    });
  }
}

// Initialize on DOMContentLoaded
document.addEventListener("DOMContentLoaded", () => {
  window.travelApp = new TravelApp();
});
