using Academy.HoloToolkit.Unity;
using UnityEngine;

/// <summary>
/// GestureAction performs custom actions based on
/// which gesture is being performed.
/// </summary>
public class GestureAction : MonoBehaviour
{
    [Tooltip("Rotation max speed controls amount of rotation.")]
    public float RotationSensitivity = 10.0f;

    private Vector3 manipulationPreviousPosition;

    void Update()
    {
        PerformRotation();
    }

    private void PerformRotation()
    {
        if (GestureManager.Instance.IsNavigating)
        {
            //left/right hand direction
            float rotationFactorY = GestureManager.Instance.NavigationPosition.x * RotationSensitivity;
            // up/down hand direction
            float rotationFactorX = GestureManager.Instance.NavigationPosition.y * RotationSensitivity;
            // front back hand direction
            float rotationFactorZ = GestureManager.Instance.NavigationPosition.z * RotationSensitivity;

            transform.Rotate(new Vector3(rotationFactorX, -1 * rotationFactorY, rotationFactorZ));
        }
    }

    void PerformManipulationStart(Vector3 position)
    {
        manipulationPreviousPosition = position;
    }

    void PerformManipulationUpdate(Vector3 position)
    {
        if (GestureManager.Instance.IsManipulating)
        {
            /* TODO: DEVELOPER CODING EXERCISE 4.a */

            Vector3 moveVector = Vector3.zero;

            // 4.a: Calculate the moveVector as position - manipulationPreviousPosition.
            moveVector = position - manipulationPreviousPosition;
            // 4.a: Update the manipulationPreviousPosition with the current position.
            manipulationPreviousPosition = position;
            // 4.a: Increment this transform's position by the moveVector.
            transform.position += moveVector;
        }  
    }
}