import React from 'react'

class Admin extends React.Component{
    constructor(props)
    {
        super(props);

        this.state={
            contest_data: null
        }
    }

    async componentDidMount(){

        // // get data

         fetch('http://localhost:1337/api/bet')
         .then((response) => response.json())
         .then((data)=>{
             console.log(data);
             this.setState({contest_data: data});
         }).then(
             console.log(this.state)
         )

    }

    render(){
        console.log(this.state);
        return(
            <div>
               i 
            </div>
        )
    }

    

}

export default Admin;