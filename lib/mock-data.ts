export const districts = [
  { name: "Jaipur", state: "Rajasthan", waterLevel: 42, riskLevel: "high", population: 3073350 },
  { name: "Jodhpur", state: "Rajasthan", waterLevel: 28, riskLevel: "critical", population: 1033918 },
  { name: "Pune", state: "Maharashtra", waterLevel: 68, riskLevel: "moderate", population: 3124458 },
  { name: "Nagpur", state: "Maharashtra", waterLevel: 55, riskLevel: "moderate", population: 2405421 },
  { name: "Chennai", state: "Tamil Nadu", waterLevel: 35, riskLevel: "high", population: 4681087 },
  { name: "Madurai", state: "Tamil Nadu", waterLevel: 48, riskLevel: "moderate", population: 1016885 },
  { name: "Ahmedabad", state: "Gujarat", waterLevel: 38, riskLevel: "high", population: 5570585 },
  { name: "Surat", state: "Gujarat", waterLevel: 72, riskLevel: "low", population: 4467797 },
  { name: "Bengaluru", state: "Karnataka", waterLevel: 45, riskLevel: "moderate", population: 8443675 },
  { name: "Hyderabad", state: "Telangana", waterLevel: 52, riskLevel: "moderate", population: 6809970 },
  { name: "Bhopal", state: "Madhya Pradesh", waterLevel: 60, riskLevel: "low", population: 1798218 },
  { name: "Indore", state: "Madhya Pradesh", waterLevel: 22, riskLevel: "critical", population: 1994397 },
]

export const reservoirs = [
  { name: "Bhakra Dam", capacity: 9621, current: 5772, state: "Himachal Pradesh" },
  { name: "Sardar Sarovar", capacity: 9500, current: 4275, state: "Gujarat" },
  { name: "Nagarjuna Sagar", capacity: 11472, current: 6883, state: "Telangana" },
  { name: "Hirakud Dam", capacity: 8136, current: 5695, state: "Odisha" },
  { name: "Tungabhadra Dam", capacity: 3322, current: 1329, state: "Karnataka" },
  { name: "Mettur Dam", capacity: 2646, current: 926, state: "Tamil Nadu" },
]

export const rainfallData = [
  { month: "Jan", actual: 12, predicted: 15, normal: 14 },
  { month: "Feb", actual: 8, predicted: 10, normal: 12 },
  { month: "Mar", actual: 15, predicted: 18, normal: 16 },
  { month: "Apr", actual: 25, predicted: 30, normal: 28 },
  { month: "May", actual: 45, predicted: 40, normal: 42 },
  { month: "Jun", actual: 180, predicted: 160, normal: 175 },
  { month: "Jul", actual: 280, predicted: 250, normal: 270 },
  { month: "Aug", actual: 260, predicted: 240, normal: 255 },
  { month: "Sep", actual: 170, predicted: 180, normal: 165 },
  { month: "Oct", actual: 80, predicted: 75, normal: 82 },
  { month: "Nov", actual: 20, predicted: 22, normal: 18 },
  { month: "Dec", actual: 10, predicted: 12, normal: 11 },
]

export const dwlrSensors = [
  { id: "DWLR-001", location: "Jaipur North", depth: 45.2, status: "active", lastReading: "2 min ago" },
  { id: "DWLR-002", location: "Jodhpur East", depth: 62.8, status: "active", lastReading: "5 min ago" },
  { id: "DWLR-003", location: "Chennai South", depth: 38.1, status: "warning", lastReading: "1 min ago" },
  { id: "DWLR-004", location: "Pune West", depth: 22.4, status: "active", lastReading: "3 min ago" },
  { id: "DWLR-005", location: "Ahmedabad Central", depth: 51.6, status: "critical", lastReading: "8 min ago" },
  { id: "DWLR-006", location: "Bengaluru North", depth: 33.7, status: "active", lastReading: "1 min ago" },
]

export const tankerOrders = [
  { id: "ORD-2024-001", customer: "Rajesh Kumar", location: "Jaipur, Sector 12", quantity: 5000, status: "pending", date: "2026-02-20", priority: "high" },
  { id: "ORD-2024-002", customer: "Priya Sharma", location: "Jodhpur, Block C", quantity: 10000, status: "dispatched", date: "2026-02-19", priority: "critical" },
  { id: "ORD-2024-003", customer: "Amit Patel", location: "Ahmedabad, Ward 7", quantity: 3000, status: "delivered", date: "2026-02-18", priority: "medium" },
  { id: "ORD-2024-004", customer: "Sunita Devi", location: "Chennai, Zone 4", quantity: 8000, status: "pending", date: "2026-02-21", priority: "high" },
  { id: "ORD-2024-005", customer: "Manoj Singh", location: "Indore, Area 3", quantity: 6000, status: "dispatched", date: "2026-02-20", priority: "medium" },
  { id: "ORD-2024-006", customer: "Kavita Nair", location: "Bengaluru, Sector 9", quantity: 4000, status: "pending", date: "2026-02-21", priority: "low" },
  { id: "ORD-2024-007", customer: "Vikram Reddy", location: "Hyderabad, Block D", quantity: 12000, status: "dispatched", date: "2026-02-19", priority: "critical" },
  { id: "ORD-2024-008", customer: "Neha Gupta", location: "Pune, Zone 2", quantity: 2000, status: "delivered", date: "2026-02-17", priority: "low" },
]

export const waterConsumption = [
  { month: "Jan", domestic: 1200, industrial: 800, agricultural: 2400 },
  { month: "Feb", domestic: 1300, industrial: 820, agricultural: 2600 },
  { month: "Mar", domestic: 1500, industrial: 850, agricultural: 3200 },
  { month: "Apr", domestic: 1800, industrial: 900, agricultural: 3800 },
  { month: "May", domestic: 2200, industrial: 950, agricultural: 4200 },
  { month: "Jun", domestic: 2000, industrial: 880, agricultural: 3000 },
  { month: "Jul", domestic: 1600, industrial: 800, agricultural: 1800 },
  { month: "Aug", domestic: 1500, industrial: 780, agricultural: 1600 },
  { month: "Sep", domestic: 1400, industrial: 790, agricultural: 2000 },
  { month: "Oct", domestic: 1350, industrial: 810, agricultural: 2400 },
  { month: "Nov", domestic: 1250, industrial: 800, agricultural: 2200 },
  { month: "Dec", domestic: 1200, industrial: 790, agricultural: 2100 },
]

export const droughtPredictions = [
  { district: "Jodhpur", state: "Rajasthan", probability: 89, severity: "Extreme", trend: "increasing" },
  { district: "Indore", state: "Madhya Pradesh", probability: 82, severity: "Severe", trend: "increasing" },
  { district: "Jaipur", state: "Rajasthan", probability: 71, severity: "Moderate", trend: "stable" },
  { district: "Chennai", state: "Tamil Nadu", probability: 65, severity: "Moderate", trend: "increasing" },
  { district: "Ahmedabad", state: "Gujarat", probability: 58, severity: "Moderate", trend: "decreasing" },
  { district: "Madurai", state: "Tamil Nadu", probability: 45, severity: "Mild", trend: "stable" },
  { district: "Bengaluru", state: "Karnataka", probability: 38, severity: "Mild", trend: "decreasing" },
  { district: "Nagpur", state: "Maharashtra", probability: 32, severity: "Mild", trend: "stable" },
]

export const alerts = [
  { id: 1, type: "critical", title: "Severe Water Shortage", message: "Jodhpur district groundwater below critical threshold. Immediate tanker deployment required.", time: "10 min ago" },
  { id: 2, type: "warning", title: "Drought Warning Issued", message: "AI model predicts 89% drought probability for Jodhpur in next 30 days.", time: "25 min ago" },
  { id: 3, type: "critical", title: "Reservoir Level Critical", message: "Mettur Dam at 35% capacity. Water rationing advisory issued for downstream districts.", time: "1 hr ago" },
  { id: 4, type: "info", title: "Tanker Dispatch Update", message: "12 tankers dispatched to Indore district. ETA: 4 hours.", time: "2 hr ago" },
  { id: 5, type: "warning", title: "DWLR Sensor Alert", message: "DWLR-005 in Ahmedabad reports 51.6m depth - approaching danger level.", time: "3 hr ago" },
]
