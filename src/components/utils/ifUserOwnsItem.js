

const ifUserOwnsItem = (productId, orderData) =>{


    let emailCheck = false
        let pIDCheck  = false
        console.log(orderData)
        let len = orderData.records.length
        for(let i = 0; i < len ; i++)
        {   
            

            if(orderData.records[i].fields.email !== localStorage.getItem('email'))
            {
                continue;
            }
            else{
                emailCheck = true
            }
            // we must account for two options, 1 order or multiple orders
            //the length will let us know
            //we get the length which is acutally the amount of lines in the string.
            //we seperate the string by new lines and input each line in an array thus getting line length of string
            //we want line length of string because 1 order only has length of 15, while more than 1 has more 
            let one_order = orderData.records[i].fields.ProductID.split("\n") 

            if(one_order.length <= 15)
            {   

                let str = one_order[2].split(':') //split string by :
                if(productId === str[1].trim())//there is an empty space " " next to productID ex.(" 626b4a272931fc49c7cbb47d") so we trim it  
                {
                    pIDCheck = true
                }
                
            }
            else{
                //if there is mulitple orders
                const record =  orderData.records[i].fields.ProductID.split("\n\n");

                //this goes througgh newly formed array of strings and splits each string by its new lines 
                for(let i = 0; i < record.length; i++)
                {
                        let temp = record[i].split(/\r?\n/) 
                        record[i] = temp 
                        let str = record[i][2].split(':')
                        if(productId === str[1].trim())
                        {
                            pIDCheck = true
                            break;
                        }
                }
                
            
            }
        }

        if(emailCheck && pIDCheck)
        {
            return true 
        }
        else{return false}

}


export default ifUserOwnsItem