const express = require('express');
const router = express.Router();
const {data} = require('../data/flashcardData.json');
const {cards} = data;

router.get('/', (req, res)=> {  
    let cardLen = cards.length;
    let randomPage = Math.floor(Math.random()* cardLen);
    res.redirect(`/cards/${randomPage}`)
})


router.get('/:id', (req, res) => {
    const {side} = req.query;
    const {id} = req.params;

    if(!side){
       return res.redirect(`/cards/${id}?side=question`)
    }

    const text = cards[id][side];
    const {hint} = cards[id];

    const templateData = { id, text};
    

    if (side === 'question'){
        templateData.hint = hint;
        templateData.sideToShow = 'answer';
        templateData.sideToShowDisplay = 'Answer';
    }
    else if(side === 'answer'){
        templateData.sideToShow = 'question';
        templateData.sideToShowDisplay = 'Question';
    }
    res.render('card', templateData);
});

module.exports = router;

// router.get('/', (req, res)=> {  
//     let randomPage = Math.florr(Math.random()*5);
//     res.redirect(`/cards/${randomPage}?side=question`)
// })

// router.get('/:id', (req, res) => {
//     const {side} = req.query;
//     const {id} = req.params;
//     const text = cards[id][side];
//     const {hint} = cards[id];
//     const templateData = { id, text};
    

//     if (side === 'question'){
//         templateData.hint = hint;
//         templateDate.sideToShow = 'answer';
//         templateDate.sideToShowDisplay = 'Answer';
//     }
//     else if(side === 'answer'){
//         templateDate.sideToShow = 'question';
//         templateDate.sideToShowDisplay = 'Question';
//     }
//     res.render('card', templateData);
// });

// module.exports = router;