export const validateReview = (req, res, next) => {

    const errors = []

    // TODO: validate req.body
    if (!req.body.voornaam.trim().length > 0) {
        errors.push({name: 'voornaam', message: 'voornaam: required'})
    }
    if (!req.body.achternaam.trim().length > 0) {
        errors.push({name: 'achternaam', message: 'achternaam: required'})
    }
    if (!req.body.score.trim().length > 0) {
        errors.push({name: 'score', message: 'score: required'})
    }
    if (errors.length) {
        return res.status(400).json({
            status: 'fail',
            message: `${errors}`
        })
    }
    next();
}