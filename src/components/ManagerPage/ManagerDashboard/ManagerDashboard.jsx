import { useEffect, useState } from "react";
import "./ManagerDashboard.css";
import axios from "axios";
// import dashboardData from "/src/dashboardData.json";
// import LandingPageShimmerUI from "../../LandingPage/LandingPageShimmerUI";
import BarChart from "./BarChart/BarChart";
import LineChart from "./LineChart/LineChart";
import PieChart from "./PieChart/PieChart";
import "../../LandingPage/LandingPage.css"
import DoughnutChart from "./DoughnutChart/DoughnutChart";
// import dailyData from "/src/dailyData.json";
// import weeklyData from "/src/weeklyData.json";
// import monthlyData from "/src/monthlyData.json";
import config from "/src/config.json";
import ManagerPageNavBar from "../ManagerPageNavBar";

const ManagerDashboard=()=>{

    const [dashboard,setDashboard]=useState(true);
    const [pieChartJson,setPieChartJson]=useState(null);
    const [pieChart,setPieChart]=useState('today');
    const [pieChartData, setPieChartData] = useState({
        labels: [],
        datasets: [{
            label: "Earnings",
            data: [],
        }]
    });

    const [barLineChartJson,setBarLineChartJson]=useState(null);
    const [chartOption,setChartOption]=useState('Bar Chart');
    const [chartData,setChartData]=useState({
        labels:[],
        datasets:[{
            label:'Earnings',
            data:[],
        }]
    });

    const [doughnutChartJson,setDoughnutChartJson]=useState(null);
    const [doughnutChartData,setDoughnutChartData]=useState({
        labels:[],
        datasets:[{
            label:'Count',
            data:[],
        }]
    });

    const [topFoodJson,setTopFoodJson]=useState(null);
    const [topFoodStatus,setTopFoodStatus]=useState('today');

    const [totalEarningJson,setTotalEarningJson]=useState(null);
    const [totalEarningStatus,setTotalEarningStatus]=useState('today');

    const [totalOrderJson,setTotalOrderJson]=useState(null);
    const [totalOrderStatus,setTotalOrderStatus]=useState('today');   

    // useEffect(()=>{
    //     setDashboard(true);
    // },[]);

    // --------------------- for pieChartData fetching  -------------------------

    
    useEffect(()=>{
        if(pieChart=='today'){
            axios.post(config.apiUrl+'/manager/analytics',{data:'daily'})
            .then((response)=>{
                setPieChartJson(response.data);   
                console.log(response.data);
            })
            .catch(()=>{
                console.log(`post request failed`)
            })
            // setPieChartJson(dailyData);
        }
        else if(pieChart=='this week'){
            axios.post(config.apiUrl+'/manager/analytics',{data:'weekly'})
            .then((response)=>{
                setPieChartJson(response.data);   
                console.log(response.data);
            })
            .catch(()=>{
                console.log(`post request failed`)
            })
            // setPieChartJson(weeklyData);
        }
        else if(pieChart=='this month'){
            axios.post(config.apiUrl+'/manager/analytics',{data:'monthly'})
            .then((response)=>{
                setPieChartJson(response.data);   
                console.log(response.data);
            })
            .catch(()=>{
                console.log(`post request failed`)
            })
            // setPieChartJson(monthlyData);
        }
    },[pieChart]);

    useEffect(() => {
        if (pieChartJson) {
            setPieChartData({
                labels: pieChartJson.mostOrderedTable.map((table) => `T${table.table_number}`),
                datasets: [{
                    label: "Earnings",
                    data: pieChartJson.mostOrderedTable.map((table) => table.total_order_sales),
                    backgroundColor: ["rgba(255, 193, 7, 0.8)", "rgba(103, 58, 183, 0.8)", "rgba(255, 87, 34, 0.8)", "rgba(76, 175, 80, 0.8)", "rgba(139, 195, 74, 0.8)", "rgba(3, 169, 244, 0.8)", "rgba(0, 188, 212, 0.8)", "rgba(33, 150, 243, 0.8)", "rgba(255, 152, 0, 0.8)", "rgba(156, 39, 176, 0.8)"]
                }]
            });
        }
    }, [pieChartJson]);

    const handlePieChart=(event)=>{
        setPieChart(event.target.value);
    }


    // --------------------- for barLineChartData fetching -------------------------
    
    useEffect(()=>{
        axios.post(config.apiUrl+'/manager/analytics',{data:'weekly'})
        .then((response)=>{
            setBarLineChartJson(response.data);
            console.log(response.data);
        })
        .catch(()=>{
            console.log('post request failed');
        })
        // setBarLineChartJson(weeklyData);
    },[]);

    useEffect(()=>{
        if(barLineChartJson){
            setChartData({
                labels:barLineChartJson.dailySales.map((date)=>{return (new Date(date.sale_date).toDateString());}),
                datasets:[{
                    label:"Earnings",
                    data:barLineChartJson.dailySales.map((date)=>{return (date.daily_sales)}),
                    backgroundColor:["#4DCA65"],
                    borderColor:'rgba(80, 80, 80, .7)',
                    borderWidth:2,
                    pointRadius:6,
                    pointBackgroundColor:'#4DCA65'
                }]
            })
        }
    },[barLineChartJson]);

    const handleChartClick=(event)=>{
        setChartOption(event.target.value);
        console.log(chartOption);
    }


    // ---------------------------- for doughnutChartData ----------------------------


    useEffect(()=>{
        axios.post(config.apiUrl+'/manager/analytics',{data:'monthly'})
        .then((response)=>{
            setDoughnutChartJson(response.data);
            console.log(response.data);
        })
        .catch(()=>{
            console.log('post request failed');
        })
        // setDoughnutChartJson(dailyData);
    },[]);

    useEffect(()=>{
        if(doughnutChartJson){
            setDoughnutChartData({
                labels:doughnutChartJson.starsCount.map((stars)=>{return (`${stars.stars}`)}),
                datasets:[{
                    label:"Count",
                    data:doughnutChartJson.starsCount.map((stars)=>{return (stars.Count)}),
                    backgroundColor: ["rgba(255, 193, 7, 0.8)", "rgba(103, 58, 183, 0.8)", "rgba(255, 87, 34, 0.8)", "rgba(76, 175, 80, 0.8)", "rgba(33, 150, 243, 0.8)"]
                }]
            })
        }
    },[doughnutChartJson]);


    // ------------------------ topFood fetching ----------------------------

    useEffect(()=>{
        if(topFoodStatus=='today'){
            axios.post(config.apiUrl+'/manager/analytics',{data:'daily'})
            .then((response)=>{
                setTopFoodJson(response.data);   
                console.log(response.data);
            })
            .catch(()=>{
                console.log(`post request failed`)
            })
            // setTopFoodJson(dailyData);
        }
        else if(topFoodStatus=='this week'){
            axios.post(config.apiUrl+'/manager/analytics',{data:'weekly'})
            .then((response)=>{
                setTopFoodJson(response.data);   
                console.log(response.data);
            })
            .catch(()=>{
                console.log(`post request failed`)
            })
            // setTopFoodJson(weeklyData);
        }
        else if(topFoodStatus=='this month'){
            axios.post(config.apiUrl+'/manager/analytics',{data:'monthly'})
            .then((response)=>{
                setTopFoodJson(response.data);   
                console.log(response.data);
            })
            .catch(()=>{
                console.log(`post request failed`)
            })
            // setTopFoodJson(monthlyData);
        }
    },[topFoodStatus]);

    const handleTopFoodStatus=(event)=>{
        setTopFoodStatus(event.target.value);
        console.log(topFoodStatus);
    }


    // ----------------------- totalEarnings fetching ---------------------------


    useEffect(()=>{
        if(totalEarningStatus=='today'){
            axios.post(config.apiUrl+'/manager/analytics',{data:'daily'})
            .then((response)=>{
                setTotalEarningJson(response.data);   
                console.log(response.data);
            })
            .catch(()=>{
                console.log(`post request failed`)
            })
             //setTotalEarningJson(dailyData);
        }
        else if(totalEarningStatus=='this week'){
            axios.post(config.apiUrl+'/manager/analytics',{data:'weekly'})
            .then((response)=>{
                setTotalEarningJson(response.data);   
                console.log(response.data);
            })
            .catch(()=>{
                console.log(`post request failed`)
            })
             //setTotalEarningJson(weeklyData);
        }
        else if(totalEarningStatus=='this month'){
            axios.post(config.apiUrl+'/manager/analytics',{data:'monthly'})
            .then((response)=>{
                setTotalEarningJson(response.data);   
                console.log(response.data);
            })
            .catch(()=>{
                console.log(`post request failed`)
            })
            // setTotalEarningJson(monthlyData);
        }
    },[totalEarningStatus]);

    const handleTotalEarningStatus=(event)=>{
        setTotalEarningStatus(event.target.value);
        console.log(totalEarningStatus);
    }    


    // ----------------------- totalOrders fetching ---------------------------


    useEffect(()=>{
        if(totalOrderStatus=='today'){
            axios.post(config.apiUrl+'/manager/analytics',{data:'daily'})
            .then((response)=>{
                setTotalOrderJson(response.data);   
                console.log(response.data);
            })
            .catch(()=>{
                console.log(`post request failed`)
            })
            // setTotalOrderJson(dailyData);
        }
        else if(totalOrderStatus=='this week'){
            axios.post(config.apiUrl+'/manager/analytics',{data:'weekly'})
            .then((response)=>{
                setTotalOrderJson(response.data);   
                console.log(response.data);
            })
            .catch(()=>{
                console.log(`post request failed`)
            })
            // setTotalOrderJson(weeklyData);
        }
        else if(totalOrderStatus=='this month'){
            axios.post(config.apiUrl+'/manager/analytics',{data:'monthly'})
            .then((response)=>{
                setTotalOrderJson(response.data);   
                console.log(response.data);
            })
            .catch(()=>{
                console.log(`post request failed`)
            })
            // setTotalOrderJson(monthlyData);
        }
    },[totalOrderStatus]);

    const handleTotalOrderStatus=(event)=>{
        setTotalOrderStatus(event.target.value);
        console.log(totalOrderStatus);
    }   


    return(
        <div className="manager-dashboard-main-container" style={{flexDirection:'column',background:'#F4F4F4'}}>
            {/* <div style={{padding:'10px 0px',paddingLeft:'14px',background:'white',fontSize:'14px'}}>
                <h3 style={{fontWeight:'500'}}>Manager Dashboard</h3>
            </div> */}
            <ManagerPageNavBar dashboard={dashboard} setDashboard={setDashboard}/>
            <div style={{background:'',display:'flex',width:'calc(100vw)',flexDirection:'row',Height:'100vh',backgroundColor:'#F4F4F4',paddingTop:'50px'}}>
                <div style={{width:'40%',height:'100%',background:'',display:'flex',flexDirection:'column',alignItems:'center'}}>
                    <div style={{display:'flex',width:'100%',height:'250px',background:'',justifyContent:'center',alignItems:'center',gap:'20px'}}>
                        <div style={{position:'relative',display:'flex',height:'214px',background:'white',width:'45%',boxShadow:'rgba(0, 0, 0, 0.04) 0px 3px 5px',borderRadius:'5px'}}>
                            <div style={{display:'flex',flexDirection:'column',marginTop:'48px',marginLeft:'20px',gap:'5px'}}>
                                <select onChange={handleTotalEarningStatus} style={{position:'absolute',left:'160',top:'10',background:'rgba(22, 23, 29, 0.25)',border:'1px',color:'white',borderRadius:'5px',fontWeight:'500',outline:'none',padding:'2px 4px'}}  name="Charts">
                                    <option value='today'>Today</option>
                                    <option value='this week'>This Week</option>
                                    <option value='this month'>This Month</option>
                                </select>
                                <div style={{padding:'17px',border:'solid 3.5px rgb(80,208,102)',borderRadius:'50%',width:'60px',display:'flex',alignItems:'center',justifyContent:'center'}}><i style={{fontSize:'18px',color:'rgb(80,208,102)'}} class="fa-solid fa-dollar-sign"></i></div>
                                {(totalEarningJson)?(
                                    <h4 style={{fontSize:'21px',marginLeft:'0px',marginTop:'10px',lineHeight:'1',color:'rgb(80,208,102)'}}>₹{totalEarningJson.totalSalesOrder[0].total_price*100/100}</h4>
                                ):(null)}
                                <h5 style={{marginLeft:'3px',fontSize:'14px',fontWeight:'500',color:'gray'}}>Total Earning</h5>
                            </div>
                            <div style={{display:'flex',gap:'10px',marginTop:'65px',marginLeft:'60px'}}>
                                <div style={{width:'5px',height:'30px',background:'rgb(80,208,102)',marginTop:'60px'}}></div>
                                <div style={{width:'5px',height:'60px',background:'rgb(80,208,102)',marginTop:'30px'}}></div>
                                <div style={{width:'5px',height:'45px',background:'rgb(80,208,102)',marginTop:'45px'}}></div>
                                <div style={{width:'5px',height:'75px',background:'rgb(80,208,102)',marginTop:'15px'}}></div>
                                <div style={{width:'5px',height:'90px',background:'rgb(80,208,102)',marginTop:'0px'}}></div>
                            </div>
                        </div>
                        <div style={{height:'214px',background:'white',width:'45%',boxShadow:'rgba(0, 0, 0, 0.04) 0px 3px 5px',borderRadius:'5px'}}>
                            <div style={{position:'relative',display:'flex',height:'214px',background:'white',width:'45%',boxShadow:'rgba(0, 0, 0, 0.04) 0px 3px 5px',borderRadius:'5px'}}>
                                <div style={{display:'flex',flexDirection:'column',marginTop:'48px',marginLeft:'20px',gap:'5px',background:''}}>
                                    <div style={{padding:'17px',border:'solid 3.5px orange',borderRadius:'50%',width:'60px',display:'flex',alignItems:'center',justifyContent:'center'}}><i style={{fontSize:'18px',color:'orange'}} class="fa-solid fa-cart-shopping"></i></div>
                                    <select onChange={handleTotalOrderStatus} style={{position:'absolute',left:'160',top:'10',background:'rgba(22, 23, 29, 0.25)',border:'1px',color:'white',borderRadius:'5px',fontWeight:'500',outline:'none',padding:'2px 4px'}}  name="Charts">
                                        <option value='today'>Today</option>
                                        <option value='this week'>This Week</option>
                                        <option value='this month'>This Month</option>
                                    </select>
                                    {(totalOrderJson)?(
                                        <h4 style={{fontSize:'21px',marginLeft:'3px',marginTop:'10px',lineHeight:'1',color:'orange'}}>{totalOrderJson.totalSalesOrder[0].total_orders}</h4>
                                    ):(null)}
                                    <h5 style={{marginLeft:'3px',fontSize:'14px',fontWeight:'500',color:'gray',position:'absolute',marginTop:'103px'}}>Total Orders</h5>
                                </div>
                                <div style={{display:'flex',gap:'10px',marginTop:'70px',marginLeft:'95px'}}>
                                    <div style={{width:'5px',height:'30px',background:'orange',marginTop:'60px'}}></div>
                                    <div style={{width:'5px',height:'60px',background:'orange',marginTop:'30px'}}></div>
                                    <div style={{width:'5px',height:'45px',background:'orange',marginTop:'45px'}}></div>
                                    <div style={{width:'5px',height:'75px',background:'orange',marginTop:'15px'}}></div>
                                    <div style={{width:'5px',height:'90px',background:'orange',marginTop:'0px'}}></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div style={{display:'flex',flexDirection:'column',height:'calc(100% - 260px)',background:'white',width:'calc(90% + 20px',boxShadow:'rgba(0, 0, 0, 0.04) 0px 3px 5px',borderRadius:'5px',padding:'20px 30px'}}>
                        <div style={{position:'relative',background:'',paddingBottom:'15px',borderBottom:'4px solid  #f1f1f6',marginBottom:'6px',paddingTop:'10px'}}>
                            <h4 style={{fontWeight:'500',fontSize:'16.5px'}}>Top 5 Most Ordered Items</h4>
                            <select onChange={handleTopFoodStatus} style={{position:'absolute',right:'0',top:'10',background:'rgba(22, 23, 29, 0.25)',border:'1px',color:'white',borderRadius:'5px',fontWeight:'500',outline:'none',padding:'2px 4px'}}  name="Charts">
                                <option value='today'>Today</option>
                                <option value='this week'>This Week</option>
                                <option value='this month'>This Month</option>
                            </select>
                        </div>
                        <div style={{overflow:'auto'}}>
                        {(topFoodJson)?(
                        topFoodJson.mostSoldItems.slice(0,5).map((item,index)=>{
                            return( 
                            <div key={index} style={{position:'relative',display:'flex',justifyContent:'',paddingLeft:'16px',paddingRight:'19px', background:'',width:'512px',alignItems:'center',height:'104.8px'}}>
                            <div style={{display:'flex',gap:'20px',alignItems:'center',width:'370px',background:''}}>
                                <img src={item.src} style={{width:'85px',borderRadius:'50%',height:'75px'}}></img>
                                <div style={{display:'flex',flexDirection:'column',gap:'0px'}}>
                                    <h3 style={{fontSize:'14.5px',fontWeight:'500'}}>{item.item_name}</h3>
                                    <h5 className="description-hidden" style={{WebkitLineClamp:'1',WebkitBoxOrient:'vertical',width:'80%',fontSize:'12px',fontWeight:'400',color:'#282c3f99',overflow:'hidden',display:'webkit-box'}}>Medium Spicy | Serves 1 | Chunks of tender paneer in a crispy, savory coating with the perfect amount of heat.</h5>
                                </div>
                            </div>
                            <div style={{display:'flex',flexDirection:'column',alignItems:'center',background:'',width:'120px'}}>
                                <h5 style={{fontSize:'14px',fontWeight:'500',color:''}}>Orders: {item.total_quantity_sold}</h5>
                                <h2 style={{fontSize:'13px',fontWeight:'500',alignSelf:'flex-start',paddingLeft:'25px',color:"#282c3f99"}}>₹{item.price*100/100}</h2>
                            </div>
                            <div style={{width:'93%', position:'absolute',height:'1.5px',background:'#f1f1f6',bottom:'0',left:'20'}}></div>
                            </div>
                            );
                        })
                        ):(null)}
                        </div>
                    </div>
                </div>
                <div style={{width:'60%',height:'100%',background:'',display:'flex',flexDirection:'column',alignItems:'flex-start',justifyContent:'flex-start',gap:'20px'}}>
                    <div style={{width:'98%',height:'48%',background:'white',marginTop:'20px',boxShadow:'rgba(0, 0, 0, 0.04) 0px 3px 5px',borderRadius:'5px',display:'flex',justifyContent:'center',position:'relative'}}>
                        <select onChange={handleChartClick} style={{position:'absolute',right:'20',marginTop:'3px',background:'rgba(22, 23, 29, 0.25)',border:'1px',color:'white',borderRadius:'5px',fontWeight:'500',outline:'none',padding:'2px 4px'}} name="Charts">
                            <option value='Bar Chart'>Bar Chart</option>
                            <option value='Line Chart'>Line Chart</option>
                        </select>
                        <h5 style={{position:'absolute',right:'90',marginTop:'40px',fontWeight:'500',fontSize:'15px'}}>Past 7 Days Earnings</h5>
                        {(chartOption=='Bar Chart')?(
                            <BarChart chartData={chartData}/>
                        ):(
                            <LineChart chartData={chartData}/>
                        )}
                    </div>
                    <div style={{width:'98%',height:'45%',background:'',display:'flex',gap:'20px'}}>
                        <div style={{position:'relative',width:'50%',height:'100%', background:'white',boxShadow:'rgba(0, 0, 0, 0.04) 0px 3px 5px',borderRadius:'5px'}}>
                        <h5 style={{ paddingLeft:'12px',fontSize:'15.5px',fontWeight:'500',paddingBottom:'25px',paddingTop:'5px'}}>Restaurant Ratings</h5>
                        {(doughnutChartJson)?(
                            <h5 style={{position:'absolute',top:'7',right:'17',fontSize:'15.5px',fontWeight:'500'}}>Avg Rating : {parseFloat(doughnutChartJson.Avearage[0].Average).toFixed(1)}⭐</h5>
                        ):(null)}
                            <div style={{height:'315px', display:'flex',justifyContent:'center'}}>
                                <DoughnutChart chartData={doughnutChartData}/>
                            </div>
                        </div>
                        <div style={{width:'50%',height:'100%',background:'white',boxShadow:'rgba(0, 0, 0, 0.04) 0px 3px 5px',borderRadius:'5px',display:'flex',flexDirection:'column'}}>
                            <h5 style={{ paddingLeft:'10px',fontSize:'15.5px',fontWeight:'500',paddingBottom:'5px',paddingTop:'5px'}}>Table Earnings </h5>
                            <select onChange={handlePieChart} style={{position:'absolute',right:'43',marginTop:'5px',background:'rgba(22, 23, 29, 0.25)',border:'1px',color:'white',borderRadius:'5px',fontWeight:'500',outline:'none',padding:'2px 4px'}} name="Charts">
                                <option value='today'>Today</option>
                                <option value='this week'>This Week</option>
                                <option value='this month'>This Month</option>
                            </select>
                            <div style={{height:'93%', display:'flex',justifyContent:'center'}}>
                                <PieChart chartData={pieChartData}/>
                            </div>
                        </div>
                    </div>
                </div>
                {/* <div style={{display:'flex',marginTop:'10px',marginLeft:'0px',background:'#2D2D2D',minWidth:'470px',padding:'20px 20px',flexDirection:'',borderRadius:'20px',height:'250px'}}>
                    <div style={{display:'flex',flexDirection:'column',gap:'10px'}}>
                        <h4 style={{color:'white',fontSize:'15px',fontWeight:'500'}}>Top 5 most sold food Items  - {type}</h4>
                        <div style={{color:'white',display:'flex',flexDirection:'column',gap:'5px',paddingLeft:'10px'}}>

                            {foodData.mostSoldItems.slice(0,5).map((item,index)=>{
                                return <li key={index}>{item.item_name}</li>
                            })}
                        </div>
                    </div>
                </div> */}
                {/* <div style={{display:'flex',marginTop:'10px',marginLeft:'0px',background:'#2D2D2D',minWidth:'550px',padding:'20px 20px',flexDirection:'',borderRadius:'25px',height:'300px'}}>
                    <div style={{position:'relative',display:'flex',flexDirection:'column',gap:'10px'}}>
                        <h4 style={{color:'white',fontSize:'15px',fontWeight:'500'}}>Top 5 Tables  - {type}</h4>
                        <div style={{color:'white',display:'flex',flexDirection:'column',gap:'5px',paddingLeft:'10px',width:'500px'}}>
                            <div style={{width:'164px',marginTop:'35px',background:'#EE4037',height:'164px',borderRadius:'50%',zIndex:'5',display:'flex',justifyContent:'center',alignItems:'center',fontSize:'22px',fontWeight:'500'}}>{foodData.mostOrderedTable[0].table_number}</div>
                            <div style={{position:'absolute',left:'140',top:'30',width:'130px',background:'#9D2062',height:'130px',borderRadius:'50%',zIndex:'4',fontSize:'22px',fontWeight:'500'}}><span style={{position:'absolute',top:'50%',left:'50%',transform:'translate(-50%,-50%'}}>{foodData.mostOrderedTable[1].table_number}</span></div>
                            <div style={{position:'absolute',right:'110',top:'130',width:'115px',background:'#652F8D',height:'115px',borderRadius:'50%',zIndex:'3',fontSize:'20px',fontWeight:'500'}}><span style={{position:'absolute',top:'50%',left:'50%',transform:'translate(-50%,-50%'}}>{foodData.mostOrderedTable[2].table_number}</span></div>
                            <div style={{position:'absolute',bottom:'0',right:'230',width:'90px',background:'#F59121',height:'90px',borderRadius:'50%',zIndex:'2',fontSize:'18px',fontWeight:'500'}}><span style={{position:'absolute',top:'50%',left:'50%',transform:'translate(-50%,-50%'}}>{foodData.mostOrderedTable[3].table_number}</span></div>
                            <div style={{position:'absolute',top:'90',right:'90',width:'70px',background:'green',height:'70px',borderRadius:'50%',zIndex:'1',fontSize:'16px',fontWeight:'500'}}><span style={{position:'absolute',top:'50%',left:'50%',transform:'translate(-50%,-50%'}}>{foodData.mostOrderedTable[4].table_number}</span></div>
                        </div>
                    </div>
                </div> */}
            </div>
        </div>
    );
}

export default ManagerDashboard;