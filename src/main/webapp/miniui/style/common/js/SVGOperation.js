/**
 * ��ʾ����������Ϣ
 * @return
 */
function showSectionInfo()
{
	alert(getSelectedDeviceID());
}

/**
 * ���Ƴ�������
 * @return
 */
function drawFlowCurve()
{
	window.open("curve.jsp?id=example")
}

/**
 * �ı���ɫ
 */
function changeColor()
{
	setDeviceStyle(getCurrentDevice(), "stroke", deviceSelectedColor);
	setDeviceStyle(getCurrentDevice(), "fill", "red");
}

/**
 * �ָ���ɫ
 */
function resumeColor()
{
	removeDeviceStyle(getCurrentDevice(), "stroke");
	removeDeviceStyle(getCurrentDevice(), "fill");
}

/**
 * ��˸
 */
function flashDevice()
{
	setDeviceFlashing(getCurrentDevice(), true);
}

/**
 * ֹͣ��˸
 */
function stopFlashDevice()
{
	setDeviceFlashing(getCurrentDevice(), false);
}

/**
 * ��˸ѡ���豸
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
 * ֹͣ��˸ѡ���豸
 */
function stopFlashSelectedDevice()
{
	var deviceArray = getSelectedDevice();
	for(var i = 0; i < deviceArray.length; i++)
	{
		setDeviceFlashing(deviceArray[i], false);
	}
}