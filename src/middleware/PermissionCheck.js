module.exports.isPrmissionsForThisAPI = async (req, res, permissions) => {
  if (
!!!(await req.user.dataValues.Role.dataValues.RolePermissions.find(
      (data) => data.Menu.menu_value == permissions
    ))
  )
    return ReE(res, CONFIG.PERMISSION_ERROR, CONFIG.FORBIDDEN);
};
