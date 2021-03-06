module.exports = async ({ getNamedAccounts, deployments, getChainId }) => {
  const { deploy, get, log } = deployments
  const { deployer } = await getNamedAccounts()
  const config = require('../deploy-configs/get-config')

  const treeDeployment = await get('TREE')

  const deployResult = await deploy('UniswapOracle', {
    from: deployer,
    args: [config.uniswapFactory, treeDeployment.address, config.reserveToken, config.oraclePeriod]
  })
  if (deployResult.newlyDeployed) {
    log(`UniswapOracle deployed at ${deployResult.address}`)
  }
}
module.exports.tags = ['UniswapOracle', 'stage1']
module.exports.dependencies = ['TREE', 'UniswapPair']
