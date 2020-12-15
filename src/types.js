import PropTypes from 'prop-types';

export const client = PropTypes.shape({
    id:PropTypes.number,
    name:PropTypes.string,
    comment:PropTypes.string,
    agent:PropTypes.string,
    collector:PropTypes.string,
    company:PropTypes.string,
    plan:PropTypes.string,
    option:PropTypes.number,
    policy_number:PropTypes.string,
    policy_type:PropTypes.string,
    prima:PropTypes.number,
    effective_date:PropTypes.string,
    renovation_date:PropTypes.string,
    frequency:PropTypes.string,
    phone:PropTypes.number,
    h_id:PropTypes.number,
})