const db = require("../model");
// const AdminUsers = require("../model/adminUsers");

const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;

 module.exports = function (passport) {
    var opts = {};
    opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
    opts.secretOrKey = CONFIG.JWT_SECRET;

    passport.use(
        new JwtStrategy(opts, async function (jwt_payload, done) {
            let err, user;
            try {
                if (jwt_payload.type == 'APP_USER') {
                    user = await db.appUser.findOne({
                        where : {
                            id: jwt_payload.user_id
                        },
                        include: [
                            {
                              model: db.Role,
                              attributes: ["id", "role_name"],
                              include: [
                                {
                                  model: db.RolePermission,
                                  attributes: ["id", "menu_id", "permission_id"],
                    
                                  include: [
                                    {
                                      model: db.Menu,
                                      attributes: ["menu_name", "menu_value"],
                                      include: [
                                        {
                                          model: db.Menu,
                                          attributes: ["menu_name", "menu_value"],
                                        },
                                      ],
                                    },
                                  ],
                                },
                              ],
                            },
                          ],
                    });
                }
                else {
                    user = await db.adminUser.findOne({
                        where : {
                            id: jwt_payload.user_id
                        },
                        include: [
                            {
                              model: db.Role,
                              attributes: ["id", "role_name"],
                              include: [
                                {
                                  model: db.RolePermission,
                                  attributes: ["id", "menu_id", "permission_id"],
                    
                                  include: [
                                    {
                                      model: db.Menu,
                                      attributes: ["menu_name", "menu_value"],
                                      include: [
                                        {
                                          model: db.Menu,
                                          attributes: ["menu_name", "menu_value"],
                                        },
                                      ],
                                    },
                                  ],
                                },
                              ],
                            },
                          ],
                    });
                }
            } catch (err) {
                err = err;
            }
            // console.log("user:::::",user.dataValues.id);

            if (err) return done(err, false);
            if (user) {
                return done(null, user);
            } else {
                return done(null, false);
            }
        })
    );
 };