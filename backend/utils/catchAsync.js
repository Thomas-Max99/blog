export const catchAsync= (fn) => (req,res,next) => {
    Promise.resolve(fn(req,res,bext)).catch(err => next(err));
};

