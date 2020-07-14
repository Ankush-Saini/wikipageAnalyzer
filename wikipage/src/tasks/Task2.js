import React from 'react';
import Histogram from 'react-chart-histogram';
class Task2 extends React.Component{
    constructor(props){
        super(props);
        this.state={
            xLabels:[],
            yValues:[],
            isLoaded:false
        }
    }
    buildChart(){
        const apiUrl = 'http://127.0.0.1:8000/task2/';
        var label=[]
        var data=[]
        fetch(apiUrl).then((response) => response.json()).then((jsonData) =>(
            jsonData.map((singleData)=>(
                label.push(singleData.totalPerSection),
                data.push(singleData.total)
            )),
            this.setState({xLabels:label,yValues:data,
        isLoaded:true})
        ));
        
    }
    componentDidMount() {
       this.buildChart()

    }


    render(){
        const ques="Look at all the attributes of the document sections and generate a histogram, showing more commonly occurring attributes and give a value of how commonly they occur. For example, if location occurs a total of 10 times but one document has 9 sections with the attribute and only one another document has one section with location attribute, the value should be 2 for how commonly they occur but on the histogram, the total count is 10.";
        if(!this.state.isLoaded) {
            return <div><div className="ques">
                        {ques}
                    </div>
                loading ...
                </div>;
        }
        const options = { fillColor: 'rgba(75,192,192,1)', strokeColor: '#000000' };
        return (<div className="task">
            <div className="ques">
                {ques}
            </div>
            <div className="quesBody">
            <Histogram
                xLabels={this.state.xLabels}
                yValues={this.state.yValues}
                height="500"
                width="1440"
                options={options}
                />
            </div>
        </div>);
    }
}
export default Task2