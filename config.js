'use strict';
exports.DATABASE_URL = process.env.DATABASE_URL || 'mongodb://localhost/caffeinated';
exports.TEST_DATABASE_URL = process.env.TEST_DATABASE_URL || 'mongodb://localhost/caffeinated-test';
exports.PORT = process.env.PORT || 8080;
// exports.JWT_SECRET = process.env.JWT_SECRET;
// exports.JWT_EXPIRY = process.env.JWT_EXPIRY || '7d';
// process.env.REACT_APP_API_BASE_URL || "http://localhost:8080/api";
