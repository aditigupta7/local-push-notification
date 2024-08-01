package com.localpushnotification

import android.content.BroadcastReceiver
import android.content.Context
import android.content.Intent
import android.util.Log
import androidx.core.app.NotificationCompat
import androidx.core.app.NotificationManagerCompat

class NotificationReceiver : BroadcastReceiver() {
    override fun onReceive(context: Context, intent: Intent) {
        Log.d("NotificationReceiver", "Notification received")

        val notificationBuilder = NotificationCompat.Builder(context, "MY_CHANNEL_ID")
            .setSmallIcon(R.drawable.ic_notification)
            .setContentTitle("App Termination")
            .setContentText("Hey, the app is killed now. None of the JS will work.")
            .setPriority(NotificationCompat.PRIORITY_DEFAULT)
            .setAutoCancel(true)
            .setSound(android.net.Uri.parse("android.resource://${context.packageName}/${R.raw.notification_sound}"))

        val notificationManager = NotificationManagerCompat.from(context)
        notificationManager.notify(1, notificationBuilder.build())
    }
}
