using Academy.HoloToolkit.Unity;
using UnityEngine;

public class Rotate : MonoBehaviour {

	// Use this for initialization
	void Start () {
		
	}
	
	// Update is called once per frame
	void Update () {
		
	}


    public void RotateScan(Vector3 rotate)
    {
        Debug.Log("Rotating Scan...");
        transform.Rotate(1 * rotate);
    }
}
