// // Create User class
// class User {
//   constructor(recipes, availableIngredients, calendar) {
//     this.recipes = recipes;
//     this.availableIngredients = availableIngredients;
//     this.calendar = calendar;
//   }

//   static canMake(recipe, copyOfIngredients) {
//     for (const reqIngredient in recipe) {
//       const reqAmount = recipe[reqIngredient];
//       if (
//         !(
//           reqIngredient in copyOfIngredients &&
//           copyOfIngredients[reqIngredient] >= reqAmount
//         )
//       ) {
//         return false;
//       }
//     }
//     return true;
//   }

//   static minus(recipe, copyOfIngredients) {
//     //remove from copyOfIngredients the contents of recipe
//     for (const reqIngredient in recipe) {
//       const reqAmount = recipe[reqIngredient];
//       copyOfIngredients[reqIngredient] -= reqAmount;
//     }
//   }

//   calculate() {
//     const copyOfIngredients = { ...this.availableIngredients };
//     const actualCalendar = [];
//     for (const day of this.calendar) {
//       actualCalendar.push({});
//       for (const dishStr of day) {
//         const dish = this.recipes[dishStr];
//         if (!User.canMake(dish, copyOfIngredients)) {
//           actualCalendar[actualCalendar.length - 1][dishStr] = "cnm";
//           continue;
//           cnm;
//         }
//         User.minus(dish, copyOfIngredients);
//         actualCalendar[actualCalendar.length - 1][dishStr] = "cm";
//       }
//     }
//     return actualCalendar;
//   }
// }

// // Create a new instance of User
// const shmuli = new User(
//   {
//     matza: { flour: 1, water: 2 },
//     donut: { flour: 1, water: 2, sugar: 3 },
//   },
//   { flour: 30, sugar: 70, water: 80 },
//   [["matza", "donut"], ["matza", "donut"], ["matza"]]
// );

// function Event({ event, index, status }) {
//   return (
//     <div className={`event ${status}`}>
//       <p>{event}</p>
//     </div>
//   );
// }

// function Day(day) {
//   return (
//     <div className="day">
//       {Object.keys(day).map((event, index) => (
//         <Event {...{ event, index }} status = {day[event]} />
        
//       ))}
//     </div>
//   );
// }

// function Calendar() {
//   const [data, setData] = React.useState(shmuli.calculate());

//   function reRender() {
//     setData(shmuli.calculate());
//   }

//   return (
//     <div id="calendar">
//       <context.Provider value={reRender}>
//         {data.map((day, i) => (
//           <Day key={i} {...day} />
//         ))}
//       </context.Provider>
//     </div>
//   );
// }

// const context = React.createContext();

// ReactDOM.render(<Calendar />, document.getElementById("root"));

