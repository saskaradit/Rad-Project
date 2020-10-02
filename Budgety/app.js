
// Budget Controller
var budgetController = (function(){

  var Expense = function(id,desc,value){
    this.id = id;
    this.desc = desc;
    this.value = value;
    this.percentage = -1;
  };

  Expense.prototype.calcPercentage = function(totalIncome) {
    if (totalIncome > 0) {
        this.percentage = Math.round((this.value / totalIncome) * 100);
    } else {
        this.percentage = -1;
    }
  };


  Expense.prototype.getPercentage = function() {
      return this.percentage;
  };
  
  Expense.prototype.test = function(){
    console.log('test');
  }
  
  var Income = function(id,desc,value){
    this.id = id;
    this.desc = desc;
    this.value = value;
  }

  var calculateTotal = function(type){
    var sum = 0;
    data.allItems[type].forEach(function(curr){
      sum += curr.value;
    })
    data.totals[type] = sum;
  }

  var data = {
    allItems: {
      exp:[],
      inc:[]
    },
    totals: {
      exp:0,
      inc:0
    },
    budget: 0,
    percentage : -1
  };

  return {
    addItem: function(type, des, val){
      var newItem,ID;

      // create new ID
      if(data.allItems[type].length > 0)
        ID = data.allItems[type][data.allItems[type].length-1].id + 1;
      else 
        ID = 0;


      // Add Item based on type
      if(type == 'inc')
        newItem = new Income(ID,des, val)
      else
        newItem = new Expense(ID,des, val)
      
      // Push Into Structure
      data.allItems[type].push(newItem);
      
      // return item 
      return newItem;
    },

    deleteItem: function(type, id){
      var index, ids;
      // example : 3
      ids = data.allItems[type].map(function(current){
        return current.id;
      })

      index = ids.indexOf(id);

      if(index !== -1){
        data.allItems[type].splice(index,1);
      }

    },

    calculateBudget : function(){
      // Calculate Total Income and Expense
      calculateTotal('exp');
      calculateTotal('inc');
      // Calculate Budget = Income - Expensse
      data.budget = data.totals.inc - data.totals.exp;

      // Calculate Percentage of the Income
      if(data.totals.inc > 0)
        data.percentage = Math.round((data.totals.exp / data.totals.inc) * 100);
      else
        data.percentage = -1;

    },

    calculatePercentages: function() {    
      data.allItems.exp.forEach(function(cur) {
         cur.calcPercentage(data.totals.inc);
      });
    },


    getPercentages: function() {
      var allPerc = data.allItems.exp.map(function(cur) {
          return cur.getPercentage();
      });
      return allPerc;
    },

    getBudget : function(){
      return {
        budget : data.budget,
        totalIncome : data.totals.inc,
        totalExpense : data.totals.exp,
        percentage : data.percentage
      }
    },

    testing: function(){
      console.log(data);
      console.log(Expense.prototype);
      Expense.test();
    }
  }

})();

// UI Controller
var UIController = (function(){

  var DOMStrings = {
    inputType: '.add__type',
    descType: '.add__description',
    value: '.add__value',
    inputButton: '.add__btn',
    incomeContainer: '.income__list',
    expenseContainer: '.expenses__list',
    budgetValue : '.budget__value',
    budgetIncome: '.budget__income--value',
    budgetExpense: '.budget__expenses--value',
    percentLabel : '.budget__expenses--percentage',
    container : '.container',
    expensePercentLabel : '.item__percentage',
    dateLabel : '.budget__title--month'
  }

  var formatNumber = function(num, type){
    var round,dec;
    // 2310.4666 = 2,310.47
    // 10000 = 10,000
    num = Math.abs(num);
    num = num.toFixed(2);
    numSplit = num.split('.');

    round = numSplit[0];
    if(round.length > 3){
      round = round.substr(0,round.length-3) + ',' + round.substr(round.length-3,3);
    }
    dec = numSplit[1];

    type === 'inc' ? sign = '+' : sign = '-';

    return (type === 'inc' ?  '+' :  '-') + ' ' + round + '.' + dec;

  }

  var nodeListForEach = function(list,callback){
    for(var i =0 ; i< list.length ; i++){
      callback(list[i],i)
    }
  };

  // some code
  return {
    getInput: function(){
      return {
        type : document.querySelector(DOMStrings.inputType).value, // will be either inc or exp
        desc : document.querySelector(DOMStrings.descType).value,
        value : parseFloat(document.querySelector(DOMStrings.value).value)
      }
    },

    addListItem: function(obj,type){
      var html,newHtml;
      // Create HTML Strings with placeholder 
      if(type == 'inc'){
        element = DOMStrings.incomeContainer;
        html = '<div class="item clearfix" id="inc-%id%"> <div class="item__description">%desc%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>'
      }
      else{
        element = DOMStrings.expenseContainer;
        html ='<div class="item clearfix" id="exp-%id%"><div class="item__description">%desc%</div> <div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div> </div>'
      }

      // Replace Placeholder text with actual text
      newHtml = html.replace('%id%',obj.id);
      newHtml = newHtml.replace('%desc%',obj.desc);
      newHtml = newHtml.replace('%value%',formatNumber (obj.value, type ));

      // Insert HTML into the DOM
      document.querySelector(element).insertAdjacentHTML('beforeend',newHtml);
    },

    deleteListItem: function(selectorID){
      var selection = document.getElementById(selectorID);
      selection.parentNode.removeChild(selection);

    },

    clearFields: function(){
      var fields;
      fields = document.querySelectorAll(DOMStrings.descType + ', ' + DOMStrings.value);
      var arrFields = Array.prototype.slice.call(fields);
      arrFields.forEach(function(curr,index,array){
        curr.value = '';
      })

      arrFields[0].focus();
    },

    displayBudget : function(obj){
      var type;
      obj.budget > 0 ? type = 'inc' : type = 'exp';
      document.querySelector(DOMStrings.budgetValue).textContent = formatNumber(obj.budget,type);
      document.querySelector(DOMStrings.budgetIncome).textContent = formatNumber(obj.totalIncome,'inc');
      document.querySelector(DOMStrings.budgetExpense).textContent = formatNumber(obj.totalExpense,'exp');
      
      if(obj.percentage > 0)
        document.querySelector(DOMStrings.percentLabel).textContent = obj.percentage + '%';
      else
        document.querySelector(DOMStrings.percentLabel).textContent = '-';

    },

    displayPercent : function(percentages){
      var fields = document.querySelectorAll(DOMStrings.expensePercentLabel);

      nodeListForEach(fields,function(current,index){
        if(percentages[index] > 0)
          current.textContent = percentages[index] + '%';
        else 
          current.textContent = '-'
      })
    },

    displayMonth : function(){
      var now, year, month, months;
      now = new Date();
      month = now.getMonth();
      months = ['January','February', 'March', 'April', 'May', 'June','July', 'August', 'September', 'October', 'November', 'December'];
      year = now.getFullYear();

      document.querySelector(DOMStrings.dateLabel).textContent= months[month] + ' ' + year;
    },

    changeType: function(){
      var fields = document.querySelectorAll(DOMStrings.inputType+ ',' + DOMStrings.descType +',' + DOMStrings.value );
      nodeListForEach(fields, function(cur){
        cur.classList.toggle('red-focus');
      })

      document.querySelector(DOMStrings.inputButton).classList.toggle('red');
    },

    getDOMStrings: function(){
      return DOMStrings;
    }

  };

})();

// App Controller
var appController = (function(_budgetController,_UIController){

  
  var setupEventListener = function(){
    var DOM = _UIController.getDOMStrings();
    document.querySelector(DOM.inputButton).addEventListener('click',addItem);
    document.addEventListener('keypress',function(events){
      if(events.keyCode === 13 || events.which === 13){
        addItem();
      }
    })
    document.querySelector(DOM.container).addEventListener('click',deleteItem);

    document.querySelector(DOM.inputType).addEventListener('change',UIController.changeType);
  }

  var updateBudget = function(){
    // 1. Calculate Budget
    budgetController.calculateBudget();

    // 2. Return The Budget
    var budget = budgetController.getBudget();

    // 3. Display The Budget
    UIController.displayBudget(budget);
    // console.log(budget);
  }

  var updatePercent = function(){
    // 1. Calculate Percentages
    budgetController.calculatePercentages();

    // 2. Read them from the budget controller
    var allPerc = budgetController.getPercentages();
    
    // 3. Update the UI
    UIController.displayPercent(allPerc);
  };

  var addItem = function(){
    var input,newItem;
    // 1. Get the field input data
    input = _UIController.getInput();

    if(input.desc !== "" && !isNaN(input.value) && input.value > 0){
      // 2. add item to budget controller
      newItem = budgetController.addItem(input.type,input.desc,input.value);
  
      // 3. add new item to the UI
      UIController.addListItem(newItem,input.type);
  
      // 4. Clear Fields
      UIController.clearFields();
  
      // 5. Calculate Budget and Update Budget
      updateBudget();

      // 6. Update Percentages
      updatePercent();
    }

    
    
  };

  var deleteItem = function(events){
    var splitID,itemID,type,ID;
    itemID = events.target.parentNode.parentNode.parentNode.parentNode.id;
    if(itemID){
      // inc 1
      splitID = itemID.split('-');
      type = splitID[0];
      ID = parseInt(splitID[1]);

      // Delete Item From Data Structure
      budgetController.deleteItem(type,ID);

      // Delete Item From UI
      UIController.deleteListItem(itemID);

      // Update and Show the New Budget
      updateBudget();

      // Update Percentages
      updatePercent();

    }
  }

  return {
    init : function(){
      console.log('App Started');
      UIController.displayMonth();
      UIController.displayBudget({
        budget : 0,
        totalIncome : 0,
        totalExpense : 0,
        percentage : -1
      });
      setupEventListener();
    }
  }


})(budgetController,UIController);

appController.init();