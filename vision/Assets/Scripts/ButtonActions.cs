using UnityEngine;
using UnityEngine.SceneManagement;

public class ButtonActions : MonoBehaviour {

    private int SCALE = 15;

    public GameObject bones;

    public void RotateDown(){
        Debug.Log("Rotating Down");
        var rotate = new Vector3(1, 0, 0);
        bones.transform.Rotate(SCALE * rotate);
    }

    public void RotateUp()
    {
        Debug.Log("Rotating Up");
        bones.transform.Rotate(SCALE * new Vector3(-1, 0, 0));
    }

    public void RotateRight()
    {
        Debug.Log("Rotating Right");
        bones.transform.Rotate(SCALE * new Vector3(0, 1, 0));
    }

    public void RotateLeft()
    {
        Debug.Log("Rotating Left");
        bones.transform.Rotate(SCALE * new Vector3(0, -1, 0));
    }

    public void GoToMenu()
    {
        Debug.Log("Switching to Menu");
        SceneManager.LoadScene("Menu");
    }

    public void GoToPelvis()
    {
        Debug.Log("Switching to Pelvis");
        SceneManager.LoadScene("ModelExplorer");
    }

    public void GoToTutorial()
    {
        Debug.Log("Switching to Tutorial");
        SceneManager.LoadScene("Tutorial");
    }

    public void GoToPikachu()
    {
        SceneManager.LoadScene("Pikachu");
    }

    public void GoToBrain()
    {
        SceneManager.LoadScene("Brain");
    }

    public void GoToKnee()
    {
        SceneManager.LoadScene("Knee");
    }

}
