package com.localpushnotification

import android.app.NotificationChannel
import android.app.NotificationManager
import android.content.Context
import android.os.Build
import android.util.Log
import androidx.core.app.NotificationCompat
import androidx.core.app.NotificationManagerCompat
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod

class LocalNotificationModule(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {

    companion object {
        private const val CHANNEL_ID = "MY_CHANNEL_ID"
        private const val NOTIFICATION_ID = 1
    }

    override fun getName(): String {
        return "LocalNotification"
    }

    @ReactMethod
    fun showNotification(title: String, message: String) {
        Log.d("LocalNotificationModule", "showNotification called with title: $title and message: $message")

        val context = reactApplicationContext

        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            val name = "LocalMessageChannel"
            val descriptionText = "Local Push Notification"
            val importance = NotificationManager.IMPORTANCE_DEFAULT
            val channel = NotificationChannel(CHANNEL_ID, name, importance).apply {
                description = descriptionText
                // Set the sound for the notification channel
                val soundUri = android.net.Uri.parse("android.resource://${context.packageName}/${R.raw.notification_sound}")
                setSound(soundUri, null)
            }

            val notificationManager: NotificationManager =
                context.getSystemService(Context.NOTIFICATION_SERVICE) as NotificationManager
            notificationManager.createNotificationChannel(channel)
        }

        val builder = NotificationCompat.Builder(context, CHANNEL_ID)
            .setSmallIcon(R.drawable.ic_notification)
            .setContentTitle(title)
            .setContentText(message)
            .setPriority(NotificationCompat.PRIORITY_DEFAULT)
            .setAutoCancel(true)
            // Set the sound for the notification
            .setSound(android.net.Uri.parse("android.resource://${context.packageName}/${R.raw.notification_sound}"))

        with(NotificationManagerCompat.from(context)) {
            notify(NOTIFICATION_ID, builder.build())
        }
    }
}
