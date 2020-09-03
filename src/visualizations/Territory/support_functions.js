
export function normalizeAngle(angle) 
{
	if(angle < 0) return normalizeNegativeAngle(angle);
	else return normalizePositiveAngle(angle);
}

function normalizeNegativeAngle(angle) 
{
	while(angle < -Math.PI * 2) 
  {
		angle += Math.PI;
	}

	return 2 * Math.PI + angle;
}

function normalizePositiveAngle(angle) 
{
	while(2 * Math.PI < angle) 
  {
		angle -= 2 * Math.PI;
	}

	return angle;
}

export function addToAngle(angle, delta)
{
  return normalizeAngle(angle + delta);
}

// returns angle2 - angle1
export function angleDifference(angle2, angle1)
{
  let rawDelta = angle2 - angle1;
  
  if(rawDelta < 0) return 2 * Math.PI + rawDelta;
  else return rawDelta;
}