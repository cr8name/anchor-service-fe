export interface Billing {
    
    billing_id: number
    utilities_id: number
    customer_id: number
    total_amount: number
    rent_amount: number
    electric_bill: number
    water_bill: number
    billing_cycle_date: string
    editable?: boolean
}
