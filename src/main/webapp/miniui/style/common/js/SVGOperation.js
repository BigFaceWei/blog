/**
 * 显示关联断面信息
 * @return
 */
function showSectionInfo()
{
	alert(getSelectedDeviceID());
}

/**
 * 绘制潮流曲线
 * @return
 */
function drawFlowCurve()
{
	window.open("curve.jsp?id=example")
}

/**
 * 改变颜色
 */
function changeColor()
{
	setDeviceStyle(getCurrentDevice(), "stroke", deviceSelectedColor);
	setDeviceStyle(getCurrentDevice(), "fill", "red");
}

/**
 * 恢复颜色
 */
function resumeColor()
{
	removeDeviceStyle(getCurrentDevice(), "stroke");
	removeDeviceStyle(getCurrentDevice(), "fill");
}

/**
 * 闪烁
 */
function flashDevice()
{
	setDeviceFlashing(getCurrentDevice(), true);
}

/**
 * 停止闪烁
 */
function stopFlashDevice()
{
	setDeviceFlashing(getCurrentDevice(), false);
}

/**
 * 闪烁选中设备
 */
function flashSelectedDevice()
{
	var deviceArray = getSelectedDevice();
	for(var i = 0; i < deviceArray.length; i++)
	{
		setDeviceFlashing(deviceArray[i], true);
	}
}

/**
 * 停止闪烁选中设备
 */
function stopFlashSelectedDevice()
{
	var deviceArray = getSelectedDevice();
	for(var i = 0; i < deviceArray.length; i++)
	{
		setDeviceFlashing(deviceArray[i], false);
	}
}