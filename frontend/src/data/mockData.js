// ============================================================
//  Data transcribed directly from mockup.png
// ============================================================

// --- Left stat panels (IN QTY / OUT QTY / WFR) ---
export const mbStats = { in: 15, out: 1, wfr: 32 }
export const pcardStats = { in: 59, out: 23, wfr: 39 }

// --- Right tables ---
export const tableColumns = ['Customer', 'Total', 'A31', 'N88', 'T66', 'A26']

// 不良待修數量
export const defectPendingTable = {
    title: '不良待修數量',
    // linkCols = column indexes rendered with an underline (customer-specific counts)
    linkCols: [2, 3, 4, 5],
    rows: [
        { label: 'MB', values: [32, 29, 0, 2, 1] },
        { label: 'P-CARD', values: [33, 29, 0, 0, 4] },
        { label: '最大時數(H)', values: [218, 21, 0, 218, 45] }
    ]
}

// 產線不良品未送修數量
export const lineNotSentTable = {
    title: '產線不良品未送修數量',
    linkCols: [2, 3, 4, 5],
    rows: [
        { label: 'MB', values: [50, 1, 48, 1, 0] },
        { label: 'P-CARD', values: [2, 2, 0, 0, 0] },
        { label: '最大時數(H)', values: [197, 13, 9, 197, 0] }
    ]
}

// --- WIP charts ---
export const wipDates = [
    '12/25', '12/26', '12/27', '12/28', '12/29', '12/30',
    '12/31', '01/01', '01/02', '01/03', '01/04', '01/05'
]

// MB WIP Status
export const mbWip = {
    le4: [46, 26, 22, 17, 13, 9, 3, 2, 2, 0, 1, 23], // <= 4 days (green)
    d47: [2, 1, 1, 0, 1, 1, 0, 0, 0, 3, 0, 1],       // 4-7 days (yellow)
    gt7: [5, 5, 6, 6, 0, 0, 0, 0, 0, 0, 1, 1],       // > 7 days (red)
    out: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 17, 0],       // OUT line
    in: [20, 0, 1, 0, 0, 0, 0, 0, 0, 0, 16, 0]       // IN line
}

// P-Card WIP Status
export const pcardWip = {
    le4: [17, 46, 30, 14, 23, 4, 13, 12, 12, 7, 3, 3],
    d47: [1, 1, 1, 1, 0, 0, 0, 1, 1, 4, 0, 0],
    gt7: [1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    out: [5, 0, 0, 0, 0, 0, 0, 0, 0, 43, 5, 19],
    in: [6, 1, 0, 0, 0, 0, 0, 0, 0, 40, 3, 19]
}
