const Calc = require('../models/model.js');

exports.performOperation = (req, res, operation) => {
  const num1 = parseFloat(req.query.num1);
  const num2 = parseFloat(req.query.num2);
  const operationName = req.query.operationName;

  // Validate input parameters
  if (isNaN(num1) || isNaN(num2)) {
    res.status(400).json({ message: 'Invalid input parameters' });
    return;
  }

  // Perform the operation and send the result
  const result = operation(num1, num2);

  const calc = new Calc({
    num1: num1,
    num2: num2,
    result: result,
    operationName: operationName
  });

  // Save Calculation in the database
  calc.save()
    .then(data => {
      res.status(200).json({ result: result, calc: data });
    })
    .catch(err => {
      res.status(500).json({ message: err.message || 'Some error occurred while creating the Calculation.' });
    });
};


    exports.getRandomCalculation = (req, res) => {
      Calc.aggregate([{ $sample: { size: 1} }])
        .then(data => {
          res.status(200).json(data);
        })
        .catch(err => {
          res.status(500).send({
            message: err.message || 'Some error occurred while retrieving Calculations.'
          });
        });
    };

    exports.deleteCurrentCalculation = (req, res) => {
      const calcId = req.params.calcId;
    
      Calc.deleteOne({ _id: calcId })
        .then(data => {
          if (!data) {
            res.status(404).json({ message: `Cannot delete Calculation with id=${calcId}. Maybe Calculation was not found!` });
          } else {
            res.status(200).json({ message: `Calculation with id=${calcId} was deleted successfully!` });
          }
        })
        .catch(err => {
          res.status(500).json({
            message: err.message || 'Some error occurred while deleting Calculation.'
          });
        });
    };

    exports.updateCurrentCalculation = (req, res) => {
      const calcId = req.params.calcId;
      const { num1, num2, operationName } = req.body;
    
      Calc.updateOne({ _id: calcId }, { num1, num2, operationName })
        .then(data => {
          if (!data) {
            res.status(404).json({ message: `Cannot update Calculation with id=${calcId}. Maybe Calculation was not found!` });
          } else {
            res.status(200).json({ message: `Calculation ${calcId} was updated successfully!`});
          }
        })
        .catch(err => {
          res.status(500).json({
            message: err.message || 'Some error occurred while updating Calculation.'
          });
        });
    };
    

    
    
    
