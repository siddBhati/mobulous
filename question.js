function sum(data) {
    return data.reduce((acc, curr) => {
      const index = acc.findIndex(item => item.price === curr.price && item.option === curr.option);
      if (index === -1) {
        acc.push({...curr});
      } else {
        acc[index].quantity += curr.quantity;
      }
      return acc;
    }, []);
  }
  
  let data = [
    {
      price: 20,
      quantity: 25,
      option: "yes"
    },
    {
      price: 12,
      quantity: 25,
      option: "yes"
    },
    {
      price: 20,
      quantity: 25,
      option: "yes"
    },
    {
      price: 15,
      quantity: 25,
      option: "yes"
    },
    {
      price: 15,
      quantity: 5,
      option: "yes"
    }
  ];
  
  const output = sum(data);
  console.log(output);
  