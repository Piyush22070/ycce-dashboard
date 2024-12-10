  
export type Site = {
    id: string
    amount: number
    status: "pending" | "processing" | "success" | "failed"
    Location : string
    date : string 
    PhoneNo : string
    email : string
    sitePlan : string 
  }
  
const data: Site[] = [
    {
      id: "m5gr84i9",             
      amount: 2000000,           
      status: "success",       
      Location: "New CCC Building", 
      date: '2024-10-14',
      PhoneNo: "99999999", 
      email : '22070963@ycce.in',
      sitePlan: "/images/sample.png"
    },
    {
      id: "3u1reuv4",
      amount: 2400000,
      status: "success",
      Location: "SDMP Auditorium",
      date: '2024-10-14',
      PhoneNo: "99999999", 
      email : '22070963@ycce.in',
      sitePlan: "/images/sample.png"
    },
    {
      id: "derv1ws0",
      amount: 300000,
      status: "processing",
      Location: "Parking",
      date: '2024-10-14',
      PhoneNo: "99999999", 
      email : '22070963@ycce.in',
      sitePlan: "/images/sample.png"
    },
    {
      id: "5kma53ae",
      amount: 5400000,
      status: "success",
      Location: "Old Science Building",
      date: '2024-10-14',
      PhoneNo: "99999999", 
      email : '22070963@ycce.in',
      sitePlan: "/images/sample.png"
    },
  ]

  export {data}
