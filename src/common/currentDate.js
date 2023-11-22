const currentDate = () => {
    let currentdate = new Date();
    console.log(currentdate.getDate())


    return currentdate.getFullYear() + "-"
                + (currentdate.getMonth()+1)  + "-" 
                + currentdate.getDate() + "T"  
                + currentdate.getHours() + ":"  
                + currentdate.getMinutes() + ":" 
                + currentdate.getSeconds();
  };

  export default currentDate;