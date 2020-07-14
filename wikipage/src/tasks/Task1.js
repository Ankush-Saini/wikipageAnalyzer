import React from 'react';
import BarChart from '../BarChart';
class Task1 extends React.Component{
    constructor(props){
        super(props);
        this.state = {
        yStart:null,
        yEnd:null,
        isSubmitted: false
      };
      this.onChange = this.onChange.bind(this);
      this.onSubmit = this.onSubmit.bind(this);
    }
    render(){
        const ques="Write a function that takes year range as a parameter and prints a timeseries or bar graph showing titles published in each year for the given range.";
        
        return (
        <div className="task">
            <div className="ques">
                {ques}
            </div>
            <div className="quesBody">
                <form onSubmit={this.onSubmit}>
                <label>Year Start:</label>
                    <input type="text" id="yStart" name="yStart" value={this.state.yStart} onChange={this.onChange}/><br/><br/>
                    <label>Year End:</label>
                    <input type="text" id="yEnd" name="yEnd" value={this.state.yEnd} onChange={this.onChange}/><br/><br/>
                    <input type="submit" value="Submit" disabled={this.state.isSubmitted}/>
                </form>
                
                {this.state.isSubmitted &&
                <Solution yStart={this.state.yStart} yEnd={this.state.yEnd}/>}
            </div>
        </div>);
    }
    onSubmit(event){
        event.preventDefault();
        if(this.state.yStart<=this.state.yEnd)
            this.setState({isSubmitted:true})
       
    }
    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });  // Getting access to entered values
        this.setState({isSubmitted:false})
     }
    
}



class Solution extends React.Component{
  
    constructor(props){
        super(props);
        this.state={
            yStart:props.yStart,
            yEnd:props.yEnd,
            dataPoints:null,
            isLoaded:false
        }
    }
    
    buildChart(){
        let apiUrl = 'http://127.0.0.1:8000/task1/';
        if(this.state.yStart !==null && this.state.yEnd!==null)
            apiUrl=apiUrl +"?start="+this.state.yStart+"&end="+this.state.yEnd;
        var label=[]
        var data=[]
        fetch(apiUrl).then((response) => response.json()).then((jsonData) =>(
            jsonData.map((singleData)=>(
                label.push(singleData.year),
                data.push(singleData.count)
            )),
            this.setState({dataPoints:{
                //Bring in data
                labels: label,
                datasets: [
                    {
                        label:'Tiltles Published Per Year',
                        backgroundColor: 'rgba(75,192,192,1)',
                        borderColor: 'rgba(0,0,0,1)',
                        borderWidth: 2,
                        data: data,
                    }
                ]
            },
        isLoaded:true})
        ));
        
        // console.log(label)
        
        // const stateData = {
        //     labels: label,
        //     datasets: [
        //       {
        //         label: 'Tiltles Published Per Year',
        //         backgroundColor: 'rgba(75,192,192,1)',
        //         borderColor: 'rgba(0,0,0,1)',
        //         borderWidth: 2,
        //         data: data
        //       }
        //     ]
        //   }
        // this.setState( {dataPoints:stateData})
        //      let myChartRef = this.chartReference.current.getContext("2d");
        //      new Chart(myChartRef, {
        //         type: "line",
        //         data: {
        //             //Bring in data
        //             labels: label,
        //             datasets: [
        //                 {
        //                     label:'Tiltles Published Per Year',
        //                     data: data,
        //                 }
        //             ]
        //         },
        //         options: {
        //             //Customize chart options
        //         }
        //     });
        //     console.log(this.chartReference)
        //     this.setState({isLoaded:true})
    }
    componentDidMount() {
       this.buildChart()

    }

  
    render(){
        if(!this.state.isLoaded) {
            return <div>loading ...</div>;
        }

        return  (
            <div>
                <BarChart data={this.state.dataPoints}/>
                </div>
            
            
        );
    }
}

export default Task1;